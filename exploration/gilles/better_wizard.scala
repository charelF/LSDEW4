// Databricks notebook source
import org.apache.spark.sql.functions._

// COMMAND ----------

val interesting_domains = Array("en.wikipedia", "de.wikipedia", "fr.wikipedia", "es.wikipedia", "ru.wikipedia", "zh.wikipedia")
val df = spark.read.format("delta").load("/mnt/group09/pageviews.delta")

// COMMAND ----------

val startDate = "2019-09-01"
val endDate = "2019-09-02"

val query = df
  .where((col("timestamp") >= 1567288800) && (col("timestamp") < 1569880800) && (col("domain").isin(interesting_domains: _*)))
  .select("timestamp", "domain", "trafficType", "accessType")
  .distinct()

// COMMAND ----------

val small = query
  .withColumn("year", from_unixtime(col("timestamp"), "yyyy"))
  .withColumn("month", from_unixtime(col("timestamp"), "MM"))
  .withColumn("day", from_unixtime(col("timestamp"), "dd"))
  .withColumn("hour", from_unixtime(col("timestamp"), "HH"))
  .limit(5)

display(small)

// COMMAND ----------

query
  .withColumn("year", from_unixtime(col("timestamp"), "yyyy"))
  .withColumn("month", from_unixtime(col("timestamp"), "MM"))
  .withColumn("day", from_unixtime(col("timestamp"), "dd"))
  .withColumn("hour", from_unixtime(col("timestamp"), "HH"))
  .write
  .parquet("/mnt/group09/website-combinations.parquet")

// COMMAND ----------

val pageviews = spark.read.format("delta").load("/mnt/group09/pageviews.delta")

// COMMAND ----------

pageviews.filter(col("timestamp") >= 1567288800 && col("timestamp") <= 1569880800).write.format("delta").save("/mnt/group09/pageviews_september_2019.delta")

// COMMAND ----------

spark.sql("create table wikimedia_pageviews_september_2019 using delta location '/mnt/group09/pageviews_september_2019.delta'")

// COMMAND ----------

// MAGIC %sql
// MAGIC 
// MAGIC optimize delta.`/mnt/group09/pageviews_september_2019.delta` zorder by (timestamp,domain,trafficType,accessType)
// MAGIC 
// MAGIC --OPTIMIZE default.wikimedia_pageviews_september_2019 ZORDER BY (timestamp,domain,trafficType,accessType)

// COMMAND ----------

// MAGIC %sql
// MAGIC 
// MAGIC CREATE TABLE IF NOT EXISTS default.wikimedia_pageviews_september_2019 (
// MAGIC   domain STRING,
// MAGIC   title STRING,
// MAGIC   pageID INT,
// MAGIC   accessType STRING,
// MAGIC   count INT,
// MAGIC   timestamp BIGINT,
// MAGIC   trafficType STRING
// MAGIC ) USING DELTA
// MAGIC PARTITIONED BY (timestamp, domain, trafficType, accessType)
// MAGIC LOCATION '/mnt/group09/wikimedia_pageviews_september_2019.parquet'

// COMMAND ----------

// MAGIC %sql
// MAGIC 
// MAGIC drop table default.wikimedia_pageviews_september_2019;

// COMMAND ----------

val websiteCombinations = spark.read.parquet("/mnt/group09/website-combinations.parquet")
val pageviews_september = spark.read.format("delta").load("/mnt/group09/pageviews_september_2019.parquet")

websiteCombinations.limit(1).join(
  pageviews,
  websiteCombinations("timestamp") === pageviews("timestamp") &&
  websiteCombinations("domain") === pageviews("domain") &&      
  websiteCombinations("trafficType") === pageviews("trafficType") &&
  websiteCombinations("accessType") === pageviews("accessType"),
  "inner"
).count()

// COMMAND ----------

var websiteCombinations = spark.read.parquet("/mnt/group09/website-combinations.parquet")

websiteCombinations.limit(1).join(
  pageviews,
  websiteCombinations("timestamp") === pageviews("timestamp") &&
  websiteCombinations("domain") === pageviews("domain") &&      
  websiteCombinations("trafficType") === pageviews("trafficType") &&
  websiteCombinations("accessType") === pageviews("accessType"),
  "inner"
).count()

// COMMAND ----------

val newDF = spark.read.parquet("/mnt/group09/website-combinations.parquet")

newDF
  .collect()
  .map(row => {
    val timestamp = row.getLong(0)
    val domain = row.getString(1)
    val trafficType = row.getString(2)
    val accessType = row.getString(3)
    val year = row.getString(4)
    val month = row.getString(5)
    val day = row.getString(6)
    val hour = row.getString(7)

    val savepath = s"/mnt/group09/website/hourly/$trafficType/$accessType/$domain/$year-$month-$day-$hour.csv"
    var fileFound = true
    try {
      dbutils.fs.ls(savepath)
    } catch {
      case e: java.io.FileNotFoundException => fileFound = false
    }
    
    if (!fileFound) {
    
    spark
      .read.format("delta")
      .load("/mnt/group09/pageviews.delta")
      .where(col("timestamp") === timestamp)
      .where(col("domain") === domain)
      .where(col("trafficType") === trafficType)
      .where(col("accessType") === accessType)
      .withColumnRenamed("count", "y")
      .groupBy("y")
      .count().withColumnRenamed("count", "x")
      .orderBy(desc("y"))
      .select("x", "y")
      .coalesce(1)
      .write
      .csv(savepath)
    }
    1
  })

// COMMAND ----------

import java.io.FileNotFoundException

def datamaker(timestamp: Long, domain: String, trafficType: String, accessType: String, year: String, month: String, day: String, hour: String) {
  
  val savepath = s"/mnt/group09/website/hourly/$trafficType/$accessType/$domain/$year-$month-$day-$hour.csv"
  try {
    dbutils.fs.ls(savepath)
  } catch {
    case e: java.io.FileNotFoundException => return
  }
  
 /* if (dbutils.fs.ls(savepath) {
    return
  }*/
  /*
  spark
    .read.format("delta")
    .load("/mnt/group09/pageviews.delta")
    .where(col("timestamp") === timestamp)
    .where(col("domain") === domain)
    .where(col("trafficType") === trafficType)
    .where(col("accessType") === accessType)
    .withColumnRenamed("count", "y")
    .groupBy("y")
    .count().withColumnRenamed("count", "x")
    .orderBy(desc("y"))
    .select("x", "y")
    .coalesce(1)
    .write
    .csv(s"/mnt/group09/website/hourly/$trafficType/$accessType/$domain/$year-$month-$day-$hour.csv")
    */
}

val sample = Row(1568419200, "zh.wikipedia", "user", "mobile-web", "2019", "09", "14", "00")
datamaker(1568419200, "zh.wikipedia", "user", "mobile-web", "2019", "09", "14", "00")