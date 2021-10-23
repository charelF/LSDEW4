# Databricks notebook source
from pyspark.sql.functions import col, count, desc, asc
import datetime as dt

# COMMAND ----------

# MAGIC %sh
# MAGIC bzcat "/dbfs/mnt/lsde/wikimedia/pageview_complete/2018/2018-08/pageviews-20180801-spider.bz2" | head -n10

# COMMAND ----------

# MAGIC %sh
# MAGIC ls -lhS /dbfs/mnt/group09

# COMMAND ----------

df = spark.read.format("delta").load("/mnt/group09/pageviews.delta")

# COMMAND ----------

df.show(10)

# COMMAND ----------

start = "04/09/2019"
start_date = dt.datetime.strptime(start,"%d/%m/%Y")
start_timestamp = int(dt.datetime.timestamp(start_date))

end = "05/09/2019"
end_date = dt.datetime.strptime(end,"%d/%m/%Y")
end_timestamp = int(dt.datetime.timestamp(end_date))


print(start_timestamp)
print(end_timestamp)

# COMMAND ----------

spark.read.format("delta").load("/mnt/group09/pageviews.delta")\
  .groupBy("title", "domain", "trafficType", "accessType", "timestamp")\
  .sum("count")\
  .withColumnRenamed("sum(count)", "CumCount")\
  .orderBy(asc("timestamp"))\
  .where((col("timestamp") > start_timestamp) & ((col("timestamp") < end_timestamp)))\
  .write\
  .parquet("/mnt/group09/A6_04-05.parquet")

# COMMAND ----------

# MAGIC %sh
# MAGIC ls -lhS /dbfs/mnt/group09/

# COMMAND ----------

df = spark.read.format("delta").load("/mnt/group09/pageviews.delta")\
  .groupBy("domain", "trafficType", "accessType", "timestamp")\
  .sum("count")\
  .withColumnRenamed("sum(count)", "CumCount")\
  .orderBy(asc("timestamp"))\
  .where((col("timestamp") > start_timestamp) & ((col("timestamp") < end_timestamp)))

# COMMAND ----------

df.show(10)

# COMMAND ----------

spark.read.format("delta").load("/mnt/group09/pageviews.delta")\
  .groupBy("title", "domain", "trafficType", "accessType", "timestamp")\
  .sum("count")\
  .withColumnRenamed("sum(count)", "CumCount")\
  .orderBy(asc("timestamp"))\
  .where((col("timestamp") > start_timestamp) & ((col("timestamp") < end_timestamp)))\
  .write\
  .parquet("/mnt/group09/A5.parquet")

# COMMAND ----------

# MAGIC %sh
# MAGIC ls -lhS /dbfs/mnt/group09/

# COMMAND ----------

query = df.groupby(["day","month", "hour"]).sum().orderBy(asc("hour"))

# COMMAND ----------

# MAGIC %sh
# MAGIC ls -lhS /dbfs/mnt/group09

# COMMAND ----------

dbfs cp dbfs:/mnt/group09/xxxx.bz2

# COMMAND ----------

display(query)

# COMMAND ----------

query = df.groupby(["domain", "accessType", "hour"]).sum()

# COMMAND ----------

display(query)

# COMMAND ----------

# MAGIC %md
# MAGIC 
# MAGIC #### visualisations:
# MAGIC - visualisations: https://docs.databricks.com/notebooks/visualizations/index.html
# MAGIC - dashboards (combination of graphs): https://docs.databricks.com/notebooks/dashboards.html
# MAGIC - interactive tables: https://docs.databricks.com/notebooks/widgets.html

# COMMAND ----------

df.groupby("domain").sum().show(10)
