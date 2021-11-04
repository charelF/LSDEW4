// Databricks notebook source
import scala.collection.mutable.ArrayBuffer
import scala.util.matching.Regex
import org.apache.spark.sql.{Row, Column}
import org.apache.spark.sql.functions._
import org.apache.spark.sql.types._
import java.time.LocalDate

// COMMAND ----------

case class PageView(domain: String, title: String, pageID: Integer, accessType: String, hour: String, count: Integer)

object Job {
  def extractHours(row: String): ArrayBuffer[PageView] = {
    val counts = ArrayBuffer[PageView]()

    val validRow: Regex = raw"^[^ ]+ [^ ]+ ([0-9]*)? [^ ]+ [0-9]+ ([A-Z][0-9]+)+$$".r
    
    if (validRow.findAllMatchIn(row).size != 0) {
      return counts
    }

    val dirtyRow = ArrayBuffer[String](row.stripLineEnd.split(" "): _*)
    if (dirtyRow.length < 5) {
      return counts
    }

    if (dirtyRow.length == 5) {
      dirtyRow.insert(2, "null")
    }

    if (dirtyRow(2) == "null") {
      dirtyRow(2) = "-1"
    }

    val summaryPattern: Regex = raw"([A-Z])(\d+)".r

    for (patternMatch <- summaryPattern.findAllMatchIn(dirtyRow(5))) {
      counts += PageView(
        dirtyRow(0), // domain
        dirtyRow(1), // title
        dirtyRow(2).toInt, // pageID
        dirtyRow(3), // accessType
        f"${patternMatch.group(1)(0).toInt - 65}%02d", // hour
        patternMatch.group(2).toInt // count
      )
    }

    return counts
  }
}

// COMMAND ----------

val paths = (2021 to 2021).flatMap(
   year => (1 to 1).flatMap(
     month => (17 to LocalDate.of(year, month, 1).lengthOfMonth()).map(
     day => f"/mnt/lsde/wikimedia/pageview_complete/$year/$year-$month%02d/pageviews-$year$month%02d$day%02d-*.bz2"
   )
 ) 
).mkString(",")

//for (path <- paths) {
  sc
    .textFile(paths)
    .flatMap(Job.extractHours)
    .toDF()
    .withColumn("filename", split(input_file_name, "/").getItem(7))
    .withColumn("raw_date", split(col("filename"), "-").getItem(1))
    .withColumn("timestamp", unix_timestamp(to_timestamp(concat(col("raw_date"), lit(' '), col("hour")), "yyyyMMdd HH")))
    .withColumn("trafficType", split(split(col("filename"), "-").getItem(2), "\\.").getItem(0))
    .drop("filename", "hour", "raw_date")
    .write
    .insertInto("default.wikimedia_pageviews")
    //.createOrReplaceTempView("pageview_sample")
  
  /*
  spark.sql("""
    INSERT INTO default.wikimedia_pageviews SELECT * FROM pageview_sample
  """)
  
  
  spark.sql("""
    MERGE INTO default.wikimedia_pageviews 
    USING pageview_sample
    ON default.wikimedia_pageviews.domain = pageview_sample.domain AND
       default.wikimedia_pageviews.title = pageview_sample.title AND
       default.wikimedia_pageviews.pageID = pageview_sample.pageID AND
       default.wikimedia_pageviews.accessType = pageview_sample.accessType AND
       default.wikimedia_pageviews.count = pageview_sample.count AND
       default.wikimedia_pageviews.timestamp = pageview_sample.timestamp AND
       default.wikimedia_pageviews.trafficType = pageview_sample.trafficType
    WHEN NOT MATCHED
    THEN INSERT *
  """) */
//}

//  .printSchema()
/*
  .sort("timestamp")
  .write
  .mode("overwrite")
  .format("delta")
  .save("/mnt/group09/six-months.delta")*/

// COMMAND ----------

// MAGIC %sql
// MAGIC 
// MAGIC select min(timestamp), max(timestamp) from pageview_sample

// COMMAND ----------

val df = spark.read.format("delta").load("/mnt/group09/pageviews.delta")
df
  .withColumn("year", from_unixtime(col("timestamp"), "yyyy"))
  .withColumn("month", from_unixtime(col("timestamp"), "MM"))
  .withColumn("day", from_unixtime(col("timestamp"), "dd"))
  .select("year", "month", "day")
  
  .distinct()
.count()
//  .printSchema()

// COMMAND ----------

val df = spark.read.format("delta").load("/mnt/group09/pageviews.delta")
val uniqueDomains = df.filter(select("domain").distinct()
uniqueDomains.cache()
uniqueDomains.count()

// COMMAND ----------

display(df.select("trafficType").distinct())

// COMMAND ----------



// COMMAND ----------

// MAGIC %sql
// MAGIC 
// MAGIC select count(timestamp) from default.wikimedia_pageviews

// COMMAND ----------

// MAGIC %sql
// MAGIC 
// MAGIC select count(timestamp) from default.wikimedia_pageviews

// COMMAND ----------

// MAGIC %sql
// MAGIC 
// MAGIC select from_unixtime(min(timestamp)), from_unixtime(max(timestamp)) from default.wikimedia_pageviews;

// COMMAND ----------

// MAGIC %sql
// MAGIC 
// MAGIC merge into default.wikimedia_pageviews 
// MAGIC   using pageview_sample
// MAGIC   on default.wikimedia_pageviews.domain = pageview_sample.domain AND
// MAGIC      default.wikimedia_pageviews.title = pageview_sample.title AND
// MAGIC      default.wikimedia_pageviews.pageID = pageview_sample.pageID AND
// MAGIC      default.wikimedia_pageviews.accessType = pageview_sample.accessType AND
// MAGIC      default.wikimedia_pageviews.count = pageview_sample.count AND
// MAGIC      default.wikimedia_pageviews.timestamp = pageview_sample.timestamp AND
// MAGIC      default.wikimedia_pageviews.trafficType = pageview_sample.trafficType
// MAGIC  when not matched
// MAGIC  then insert *

// COMMAND ----------

// MAGIC %sql
// MAGIC 
// MAGIC insert into default.wikimedia_pageviews select * from pageview_sample

// COMMAND ----------

// MAGIC %sql
// MAGIC 
// MAGIC select count(*) from default.wikimedia_pageviews;

// COMMAND ----------

// MAGIC %md
// MAGIC 
// MAGIC ## Delta Lake experiments

// COMMAND ----------

// MAGIC %sql
// MAGIC 
// MAGIC OPTIMIZE default.wikimedia_pageviews zorder by (timestamp)

// COMMAND ----------

import org.apache.spark.sql.SparkSession

val s = SparkSession.builder.config("spark.databricks.delta.retentionDurationCheck.enabled", "false").getOrCreate()

display(s.sql("vacuum '/mnt/group09/pageviews.delta' retain 0 hours"))

// COMMAND ----------

display(spark.sql("select domain, count(domain) as total_count from optimisation_v1 group by domain order by total_count desc"))

// COMMAND ----------

spark.sql("optimize delta.`/mnt/group09/pageviews.delta` zorder by (timestamp)")

// COMMAND ----------

spark.sql("vacuum '/mnt/group09/optimisation-v1.delta")

// COMMAND ----------

// MAGIC %python
// MAGIC 
// MAGIC sum([f.size for f in dbutils.fs.ls("/mnt/group09/sample.delta")]) / 1e9

// COMMAND ----------

// MAGIC %sql
// MAGIC 
// MAGIC CREATE TABLE IF NOT EXISTS default.wikimedia_pageviews (
// MAGIC   domain STRING,
// MAGIC   title STRING,
// MAGIC   pageID INT,
// MAGIC   accessType STRING,
// MAGIC   count INT,
// MAGIC   timestamp BIGINT,
// MAGIC   trafficType STRING
// MAGIC ) USING DELTA
// MAGIC --PARTITIONED BY (timestamp)
// MAGIC LOCATION '/mnt/group09/pageviews.delta'

// COMMAND ----------

// MAGIC %sql
// MAGIC 
// MAGIC drop table default.wikimedia_pageviews
