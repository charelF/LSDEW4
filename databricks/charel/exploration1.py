# Databricks notebook source
from pyspark.sql.functions import col, count, desc, asc

# COMMAND ----------

# MAGIC %sh
# MAGIC bzcat "/dbfs/mnt/lsde/wikimedia/pageview_complete/2018/2018-08/pageviews-20180801-spider.bz2" | head -n10

# COMMAND ----------

# MAGIC %sh
# MAGIC ls -lhS /dbfs/mnt/group09

# COMMAND ----------

# MAGIC %sh
# MAGIC ls /dbfs/mnt/group09/attack.parquet

# COMMAND ----------

# MAGIC %sh
# MAGIC ls /dbfs/mnt/group09

# COMMAND ----------

df = spark.read.parquet("/mnt/group09/pageviews-20190907-user.parquet")

# COMMAND ----------

df.show(10)

# COMMAND ----------

# df.count()  # this can take long, particularly on big dataset

# COMMAND ----------

df

# COMMAND ----------

query = df.groupby("hour").avg().orderBy(asc("hour"))

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

display(diamonds_df.groupBy("color").avg("price").orderBy("color"))

