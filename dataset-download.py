# Databricks notebook source
# MAGIC %md
# MAGIC 
# MAGIC # Crawl 
# MAGIC This notebooks contains code to crawl the `pageviews_complete` dataset from the Wikimedia servers.

# COMMAND ----------

!pip install requests

# COMMAND ----------

from pyspark.sql.session import SparkSession

from pathlib import Path
import requests
import time
import json
import re

# COMMAND ----------

download_links = open("/dbfs/mnt/group09/download_links.txt").read().strip().split("\n")

# COMMAND ----------

def download_file(url):
  path_components = ["/mnt/lsde/wikimedia"] + url.split("/")[4:]
  filename = "/dbfs" + "/".join(path_components)
  ok_file = filename + ".OK"

  Path(filename).parent.mkdir(parents=True, exist_ok=True)
  
  if Path(ok_file).exists():
    return (1,)
  
  exp_wait = 1
  
  while True:
    with requests.get(url, stream=True) as r:
      try:
        r.raise_for_status()
        with open(filename, "wb") as f:
          for chunk in r.iter_content(chunk_size=4096):
            f.write(chunk)
        break
      except requests.exceptions.HTTPError as e:
        print(f"{e} occured, waiting {exp_wait}s")
        time.sleep(exp_wait)
        exp_wait *= 2
        if exp_wait > 300: # don't wait longer than 5 minutes
          return (0,)

  f = open(filename+".OK", "w")
  f.write("OK\n")
  f.close()

  return (1,)

spark = SparkSession \
  .builder \
  .config("spark.dynamicAllocation.enabled", "true") \
  .getOrCreate()

rdd = spark.sparkContext.parallelize(download_links)
df = rdd.map(download_file).toDF()
df.groupby(df[0]).sum().display()

# COMMAND ----------

download_file("https://dumps.wikimedia.org/other/pageview_complete/monthly/2018/2018-01/pageviews-201801-spider.bz2")

# COMMAND ----------

# MAGIC %md
# MAGIC 
# MAGIC Count `*.OK` files to quantify the download process.

# COMMAND ----------

ok_paths = []
for year_path in dbutils.fs.ls("/mnt/lsde/wikimedia/pageview_complete/"):
  for month_path in dbutils.fs.ls(year_path.path):
    for daily_path in dbutils.fs.ls(month_path.path):
      if daily_path.path.endswith(".OK"):
        ok_paths.append(daily_path.path)

len(ok_paths)

# COMMAND ----------

# MAGIC %md
# MAGIC 
# MAGIC ### Basic dataset validation
# MAGIC 
# MAGIC Ensure that the downloaded size corresponds to the expected download size.

# COMMAND ----------

files = json.loads(open("/dbfs/mnt/group09/sizes.json").read())
sizes = {"/".join(f['file'].split("/")[4:]): f['size'] for f in files if re.search(r"20(1[8-9]|2[0-1])-", f["file"])}

verified_urls = set()
invalid_urls = set()

# COMMAND ----------

for path, size in sizes.items():
  if path in verified_urls or path in invalid_urls:
    continue

  if dbutils.fs.ls("/mnt/lsde/wikimedia/"+path)[0].size == size:
    verified_urls.add(path)
  else:
    invalid_urls.add(path)

len(invalid_urls) == 0

# COMMAND ----------

# MAGIC %md
# MAGIC 
# MAGIC ## Clean up OK files

# COMMAND ----------

ok_count = 0
for year_path in dbutils.fs.ls("/mnt/lsde/wikimedia/pageview_complete/"):
  for month_path in dbutils.fs.ls(year_path.path):
    for daily_path in dbutils.fs.ls(month_path.path):
      if daily_path.path.endswith(".OK"):
        dbutils.fs.rm(daily_path.path)
        ok_count += 1
print(ok_count)

# COMMAND ----------

# MAGIC %md
# MAGIC 
# MAGIC ## Compute total size of dataset in MiB

# COMMAND ----------

total_size = 0
for year_path in dbutils.fs.ls("/mnt/lsde/wikimedia/pageview_complete/"):
  for month_path in dbutils.fs.ls(year_path.path):
    for daily_path in dbutils.fs.ls(month_path.path):
      if daily_path.path.endswith(".bz2"):
        total_size += daily_path.size
print(total_size)

# COMMAND ----------

total_size // (2**30)
