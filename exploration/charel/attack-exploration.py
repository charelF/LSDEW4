# Databricks notebook source
from pyspark.sql.functions import col, count, desc, asc, countDistinct

# COMMAND ----------

# MAGIC %sh
# MAGIC ls -lhS /dbfs/mnt/group09/attack-yoy.parquet

# COMMAND ----------

df = spark.read.parquet("/mnt/group09/attack-yoy.parquet")

# COMMAND ----------

query = df\
.groupby("year", "month", "day", "hour")\
.sum("count")\
.withColumnRenamed("sum(count)", "sumCount")\
.withColumn("date", col("hour") + col("day")*100 + col("month")*100*100 + col("year")*100*100*100)\
.select(["date", "sumCount"])\
.orderBy(asc("date"))

# COMMAND ----------

display(query)

# COMMAND ----------



# COMMAND ----------


