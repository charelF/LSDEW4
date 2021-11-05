# Databricks notebook source
# MAGIC %sh
# MAGIC ls -lhS /dbfs/mnt/group09

# COMMAND ----------

import datetime
from pyspark.sql.functions import col, desc
import pyspark.sql.functions as f

# COMMAND ----------

df = spark.read.format("delta").load("/mnt/group09/pageviews.delta")

# COMMAND ----------

def datamaker(loc, ts, dom, tt, at):
  df = spark.read.format("delta").load("/mnt/group09/pageviews.delta")
  dt = datetime.datetime.fromtimestamp(ts)
  savepath = f"{loc}/hourly/{tt}/{at}/{dom}/{dt.year}-{dt.month:02d}-{dt.day:02d}-{dt.hour:02d}.csv"
  
  extracted_rows = df.where((col("timestamp") == ts) & (col("domain") == dom) & (col("trafficType") == tt) & (col("accessType") == at))
  compressed_counts = extracted_rows.withColumnRenamed("count", "y").groupBy("y").count().withColumnRenamed("count", "x").orderBy(desc("y")).select("x", "y")
  # at this point we have a DF with variable rows, and 2 cols, x and y
  compressed_counts.coalesce(1).write.csv(savepath)

# COMMAND ----------

d1 = int(datetime.datetime.timestamp(datetime.datetime(2019, 8, 1, 0, 0, 0)))
d2 = int(datetime.datetime.timestamp(datetime.datetime(2019, 9, 1, 0, 0, 0)))
interesting_domains = ["en.wikipedia", "de.wikipedia", "fr.wikipedia", "es.wikipedia", "ru.wikipedia", "zh.wikipedia"]

# COMMAND ----------

# MAGIC %md
# MAGIC ## Hourly Data

query = df.where((col("timestamp") >= d1) & (col("timestamp") < d2))\
.where(col("domain").isin(interesting_domains))\
.withColumnRenamed("count", "y")\
.groupby(["timestamp", "domain", "trafficType", "accessType", "y"])\
.count()\
.withColumnRenamed("count", "x")\
.write.mode("overwrite").parquet("/mnt/group09/websitedata123/aug2019.parquet")

# COMMAND ----------

# MAGIC %md
# MAGIC ## JSON FORMAT
# MAGIC 
# MAGIC ```json
# MAGIC {
# MAGIC  0:[ {"x":1, "y":2}, {"x":2, "y":4}, ... ],
# MAGIC  1:[ ... ],
# MAGIC  ...
# MAGIC }
# MAGIC ```

# COMMAND ----------

# MAGIC %md
# MAGIC ## Monthly Data

# COMMAND ----------

query = df.where((col("timestamp") >= d1) & (col("timestamp") < d2))\
.where(col("domain").isin(interesting_domains))\
.groupby(["timestamp", "domain", "trafficType", "accessType"]).sum("count").withColumnRenamed("sum(count)", "sumcount")

# COMMAND ----------

query.repartition(10).write.mode("overwrite").parquet("/mnt/group09/websitedatamonthly/aug2019.parquet")