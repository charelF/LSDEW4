# Databricks notebook source
# MAGIC %pip install requests bs4 lxml

# COMMAND ----------

from pyspark.sql.session import SparkSession

import requests
from bs4 import BeautifulSoup
from pathlib import Path
import re

# COMMAND ----------

spark = SparkSession.builder.config("spark.default.parallelism", "2").getOrCreate()

base_path = Path("/mnt/group09")

# COMMAND ----------

def fetch_file_listing(url):
    print(f"Fetch {url}")
    resp = requests.get(url).text
    lines = resp.strip().split("\r\n")
    table = [re.split("\s{2,}", line) for line in lines if line.startswith("<a")]
    results = []
    for row in table:
        link, date, size = row
        href = BeautifulSoup(link, "lxml").find("a")['href']
        if href.endswith("/"):
            results.extend(fetch_file_listing(url + href))
        else:
            results.append({"file": url + href, "date": date, "size": int(size)})
    return results

# COMMAND ----------

base_url = "https://dumps.wikimedia.org/other/unique_devices/per_domain/"
file_metadata = fetch_file_listing(base_url)

# COMMAND ----------

file_metadata

# COMMAND ----------

def download_file(url):
  path_components = ["/mnt/group09"] + url.split("/")[4:]
  filename = "/dbfs" + "/".join(path_components)
  
  Path(filename).parent.mkdir(parents=True, exist_ok=True)
  
  with requests.get(url, stream=True) as r:
    r.raise_for_status()
    with open(filename, "wb") as f:
      for chunk in r.iter_content(chunk_size=4096):
        f.write(chunk)
  return filename
  
download_file(file_metadata[0]['file'])

# COMMAND ----------

# MAGIC %ls /mnt/group09

# COMMAND ----------

df = spark.read.csv("/mnt/group09/unique_devices/per_domain/2015/2015-12/unique_devices_per_domain_daily-2015-12-18.gz", inferSchema=True, sep="\t")

# COMMAND ----------

dbutils.fs.ls("/mnt/group09/unique_devices/per_domain/2015/2015-12/unique_devices_per_domain_daily-2015-12-18.gz")

# COMMAND ----------

df.head(n=10)

# COMMAND ----------

df.write.parquet("/mnt/group09/unique_devices/per_domain/2015/2015-12/unique_devices_per_domain_daily-2015-12-18.parquet")

# COMMAND ----------

# MAGIC %sh du -h /dbfs/mnt/group09/unique_devices/per_domain/2015/2015-12/*

# COMMAND ----------

dbutils.fs.help()

# COMMAND ----------

dbutils.fs.rm("/dbfs", recurse=True)

# COMMAND ----------

# MAGIC %sh df -h

# COMMAND ----------

def get_ip():
  resp = requests.get("https://ifconfig.me")
  return resp.content

spark = SparkSession.builder.config("spark.task.cpus", 2).config("spark.executor.cores", 1).config('spark.executor.instances', 2).getOrCreate() #.config("spark.dynamicAllocation.minExecutors", "8").getOrCreate()
rdd = spark.sparkContext.parallelize(list(range(100))).map(lambda _: get_ip())
print(rdd.repartition(8))
set(rdd.collect())


# COMMAND ----------

get_ip(0)

# COMMAND ----------

# MAGIC %sh curl ifconfig.me

# COMMAND ----------

spark.sparkContext.getConf().getAll()

# COMMAND ----------

from pyspark.sql.session import SparkSession
import requests

def get_ip():
  return requests.get("https://ifconfig.me").content

spark = SparkSession.builder.config("spark.executor.cores", 1).config('spark.executor.instances', 8).getOrCreate()
rdd = spark.sparkContext.parallelize(list(range(8))).repartition(8).map(lambda _: get_ip())
print(set(rdd.collect()))


# COMMAND ----------

import socket

def get_host(nr):
  return (nr, socket.gethostname())

rdd = sc.parallelize(list(range(100000000)))
df = rdd.map(get_host).toDF()
df.groupby(df[1]).count().display()

# COMMAND ----------

ok_paths = []
for year_path in dbutils.fs.ls("/mnt/lsde/wikimedia/pageview_complete/"):
  for month_path in dbutils.fs.ls(year_path.path):
    for daily_path in dbutils.fs.ls(month_path.path):
      if daily_path.path.endswith(".OK"):
        ok_paths.append(daily_path.path)

len(ok_paths)

# COMMAND ----------

download_links = open("/dbfs/mnt/group09/download_links.txt").read().strip().split("\n")
len(download_links)

# COMMAND ----------

download_links[-1]

# COMMAND ----------


