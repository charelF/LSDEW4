import org.apache.spark.sql.functions._

val df = spark.read.format("delta").load("/mnt/group09/pageviews.delta")
val uniqueTimestamps = df.select(date_format(from_unixtime(col("timestamp")), "yyyy-MM-dd").alias("date")).distinct()
uniqueTimestamps.write.mode("overwrite").parquet("/mnt/group09/current-dates.parquet")