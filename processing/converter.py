# Databricks notebook source
# MAGIC %md
# MAGIC 
# MAGIC # Converter file
# MAGIC 
# MAGIC Currently files are at: ```/dbfs/mnt/lsde/wikimedia/pageview_complete/2018/2018-08/pageviews-20180801-spider.bz2```
# MAGIC 
# MAGIC We now put the desired files at ```/dbfs/mnt/group09/pageview_complete/```

# COMMAND ----------

from fastreader import fastreader

inputfilepath = "/dbfs/mnt/lsde/wikimedia/pageview_complete/2018/2018-08/pageviews-20180801-spider.bz2"
outputfilepath = "/dbfs/mnt/group09/pageview_complete/test.parquet"

files = [(inputfilepath, outputfilepath)]

rdd = sc.parallelize(files)
df = rdd.map(fastreader).toDF().display()

# fastreader(inputfilepath, outputfilepath)

# COMMAND ----------

# MAGIC %sh
# MAGIC ls ..

# COMMAND ----------


