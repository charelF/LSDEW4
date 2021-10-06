# Databricks notebook source
!pip install requests

# COMMAND ----------

from pyspark.sql.session import SparkSession

from pathlib import Path
import requests
import time

# COMMAND ----------

download_links = open("/dbfs/mnt/group09/download_links.txt").read().split("\n")

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
        if exp_wait > 300: # don't wait longer than 10 minutes
          return (0,)

  f = open(filename+".OK", "w")
  f.write("OK\n")
  f.close()

  return (1,)

spark = SparkSession \
  .builder \
  .config("spark.dynamicAllocation.enabled", "true") \
  .getOrCreate()

rdd = spark.sparkContext.parallelize(download_links)#.repartition(100)
df = rdd.map(download_file).toDF()
df.groupby(df[0]).sum().display()

# COMMAND ----------

ok_paths = []
for year_path in dbutils.fs.ls("/mnt/lsde/wikimedia/pageview_complete/"):
  for month_path in dbutils.fs.ls(year_path.path):
    for daily_path in dbutils.fs.ls(month_path.path):
      if daily_path.path.endswith(".OK"):
        ok_paths.append(daily_path.path)

len(ok_paths)
