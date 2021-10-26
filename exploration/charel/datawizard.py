# Databricks notebook source
# MAGIC %sh
# MAGIC ls -lhS /dbfs/mnt/group09

# COMMAND ----------

import datetime
from pyspark.sql.functions import col, count, desc, asc, countDistinct, to_date, to_timestamp
from pyspark.sql.functions import year, month, dayofmonth
import pyspark.sql.functions as f

# COMMAND ----------

year("1567551600").alias('year')

# COMMAND ----------



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

d1 = int(datetime.datetime.timestamp(datetime.datetime(2019, 9, 1, 0, 0, 0)))
d2 = int(datetime.datetime.timestamp(datetime.datetime(2019, 10, 1, 0, 0, 0)))
interesting_domains = ["en.wikipedia", "de.wikipedia", "fr.wikipedia", "es.wikipedia", "ru.wikipedia", "zh.wikipedia"]

query = df.where((col("timestamp") > d1) & (col("timestamp") < d2))\
.where(col("domain").isin(interesting_domains))\
.select(["timestamp", "domain", "trafficType", "accessType"])\
.distinct()

# COMMAND ----------

query.limit(5).foreach(lambda row: datamaker(loc="/mnt/group09/temporary/", ts=row["timestamp"], dom=row["domain"], tt=row["trafficType"], at=row["accessType"]))

# COMMAND ----------

datamaker(loc="/mnt/group09/temporary/", ts=1567551600, dom="de.wikipedia", tt="user", at="desktop")

# COMMAND ----------

# MAGIC %sh
# MAGIC cat /dbfs/mnt/group09/temporary/hourly/user/desktop/de.wikipedia/2019-9-3-23.csv/part-00000-tid-5069189454688460319-bfbff41a-688c-4a1f-9f96-27c42df6a04d-103644-1-c000.csv

# COMMAND ----------

dfsmall = df.where((col("timestamp") == 1567551600) & (col("domain") == "de.wikipedia"))#.select(["count"])

# COMMAND ----------

df_comp = dfsmall.withColumnRenamed("count", "y").groupBy("y").count().withColumnRenamed("count", "x").orderBy(desc("y")).select("x", "y")#.show()

# COMMAND ----------

df_comp.coalesce(1).write.mode("overwrite").json("/mnt/group09/tempfile/123/123/123/tempjson.json")

# COMMAND ----------

"de.wikipedia"

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

datetime.datetime.fromtimestamp(1569405600).strftime("")

# COMMAND ----------

# MAGIC %sh
# MAGIC ls -R /dbfs/mnt/group09/tempfile

# COMMAND ----------

dfsmall.groupBy(col("count")).sum().orderBy(desc("count")).show()#

# COMMAND ----------


