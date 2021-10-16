# Databricks notebook source
from pyspark.sql.functions import col, count, desc, asc

# COMMAND ----------

# MAGIC %sh
# MAGIC bzcat "/dbfs/mnt/lsde/wikimedia/pageview_complete/2018/2018-08/pageviews-20180801-spider.bz2" | head -n10

# COMMAND ----------

# MAGIC %sh
# MAGIC ls -lhS /dbfs/mnt/group09

# COMMAND ----------

df = spark.read.parquet("/mnt/group09/attack.parquet")

# COMMAND ----------

df.show(10)

# COMMAND ----------

spark.read.parquet("/mnt/group09/attack.parquet").groupby(["day","month", "hour"]).sum("count").orderBy(asc("hour")).write.parquet("alexd.parquet")

# COMMAND ----------

# MAGIC %sh
# MAGIC ls -lhS /dbfs/mnt/group09

# COMMAND ----------

# spark.read.parquet("/mnt/group09/attack.parquet")
#   .groupBy(col("trafficType"))
#   .agg(sum("count").alias("max_count"))
#   .orderBy(desc("max_count"))
#   .write
#   .parquet("a1.parquet")

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
