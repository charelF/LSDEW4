# Databricks notebook source
# MAGIC %sql
# MAGIC 
# MAGIC select max(timestamp) from default.wikimedia_pageviews;

# COMMAND ----------

# MAGIC %sql
# MAGIC 
# MAGIC SELECT
# MAGIC   * 
# MAGIC FROM
# MAGIC   default.wikimedia_pageviews
# MAGIC WHERE 
# MAGIC   from_unixtime(timestamp) >= to_timestamp('2019-09-06 00:00:00') AND 
# MAGIC   from_unixtime(timestamp) <= to_timestamp('2019-09-06 12:00:00')
# MAGIC LIMIT 10

# COMMAND ----------

# MAGIC %sql
# MAGIC 
# MAGIC select count(*) from default.wikimedia_pageviews;

# COMMAND ----------

spark.sql("""select date_format(from_unixtime(timestamp), "yyyy-MM-dd") as date from default.wikimedia_pageviews group by date_format(from_unixtime(timestamp), "yyyy-MM-dd") order by date_format(from_unixtime(timestamp), "yyyy-MM-dd")""").write.mode("overwrite").parquet("/mnt/group09/current-dates.parquet")

# COMMAND ----------

# MAGIC %scala
# MAGIC 
# MAGIC import org.apache.spark.sql.functions._
# MAGIC 
# MAGIC val df = spark.read.format("delta").load("/mnt/group09/pageviews.delta")
# MAGIC val uniqueTimestamps = df.select(date_format(from_unixtime(col("timestamp")), "yyyy-MM-dd").alias("date")).distinct()
# MAGIC uniqueTimestamps.write.mode("overwrite").parquet("/mnt/group09/current-dates.parquet")

# COMMAND ----------


