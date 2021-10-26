# Databricks notebook source
# MAGIC %sh
# MAGIC ls -lhS /dbfs/mnt/group09

# COMMAND ----------

import datetime
from pyspark.sql.functions import col, count, desc, asc, countDistinct, to_date, to_timestamp
from pyspark.sql.functions import year, month, dayofmonth

# COMMAND ----------

df = spark.read.format("delta").load("/mnt/group09/pageviews.delta")

# COMMAND ----------

d1 = int(datetime.datetime.timestamp(datetime.datetime(2019, 9, 1, 0, 0, 0)))
d2 = int(datetime.datetime.timestamp(datetime.datetime(2019, 10, 1, 0, 0, 0)))

query = df.where((col("timestamp") > d1) & (col("timestamp") < d2))\
.groupby(["timestamp", "domain", "trafficType", "accessType"])\
.select(["count"])

# COMMAND ----------

dfsmall = df.where((col("timestamp") == 1567551600) & (col("domain") < "ar.wikipedia")).select(["count"])

# COMMAND ----------

dfsmall.groupBy(col("count")).sum().orderBy(desc("count")).alias("count", "y").show()

# COMMAND ----------

dfsmall.show(10)

# COMMAND ----------


