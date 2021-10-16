// Databricks notebook source
import scala.collection.mutable.ArrayBuffer
import scala.util.matching.Regex
import org.apache.spark.sql.{Row, Column}
import org.apache.spark.sql.functions._
import org.apache.spark.sql.types._

// COMMAND ----------

case class PageView(domain: String, title: String, pageID: Integer, accessType: String, hour: Integer, count: Integer)

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
        patternMatch.group(1)(0).toInt - 65, // hour
        patternMatch.group(2).toInt // count
      )
    }

    return counts
  }
}

// COMMAND ----------

val paths = (2018 to 2019).flatMap(
   year => (9 to 9).flatMap(
     month => (1 to 30).map(
     day => (day, month, year)
   )
 ) 
).map(date => date match {
    case (day, month, year) => f"/mnt/lsde/wikimedia/pageview_complete/$year/$year-$month%02d/pageviews-$year$month%02d$day%02d-*.bz2"
}).mkString(",")

// COMMAND ----------

display(sc
  .textFile("/mnt/group09/pageviews-20190905-user.bz2")
  .flatMap(Job.extractHours)
  .toDF()
  .withColumn("filename", split(input_file_name, "/").getItem(3))
  .withColumn("date", split(col("filename"), "-").getItem(1))
  .withColumn("trafficType", split(split(col("filename"), "-").getItem(2), "\\.").getItem(0))
  .withColumn("year", substring(col("date"), 0, 4).cast(IntegerType))
  .withColumn("month", substring(col("date"), 5, 2).cast(IntegerType))
  .withColumn("day", substring(col("date"), 7, 2).cast(IntegerType))
        )

// COMMAND ----------

sc
  .textFile(paths)
  .flatMap(Job.extractHours)
  .toDF()
  .withColumn("filename", split(input_file_name, "/").getItem(7))
  .withColumn("date", split(col("filename"), "-").getItem(1))
  .withColumn("trafficType", split(split(col("filename"), "-").getItem(2), "\\.").getItem(0))
  .withColumn("year", substring(col("date"), 0, 4).cast(IntegerType))
  .withColumn("month", substring(col("date"), 5, 2).cast(IntegerType))
  .withColumn("day", substring(col("date"), 7, 2).cast(IntegerType))
  .drop("filename", "date")
  .repartitionByRange(4, col("hour"))
  .sort("year", "month", "day", "hour")
  .write
  .mode("overwrite")
  .partitionBy("year", "month", "day")
  .parquet("/mnt/group09/attack-yoy.parquet")

// COMMAND ----------

// MAGIC %sh ls -l /dbfs/mnt/group09/attack.parquet/year=2019/month=9/day=10

// COMMAND ----------

display(
  spark.read.parquet("/mnt/group09/attack.parquet")
  .groupBy(col("trafficType"))
  .agg(sum("count").alias("max_count"))
  .orderBy(desc("max_count"))
  .write
  .parquet("blablablalba.parquet")
)
