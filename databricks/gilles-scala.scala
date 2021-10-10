// Databricks notebook source
import scala.collection.mutable.ArrayBuffer
import scala.util.matching.Regex
import org.apache.spark.sql.{Row, Column}
import org.apache.spark.sql.functions._

case class PageView(domain: String, title: String, pageID: Integer, accessType: String, hour: Integer, count: Integer)

def extractHours(row: String): ArrayBuffer[PageView] = {
  val dirtyRow = ArrayBuffer[String](row.stripLineEnd.split(" "): _*)
  val counts = ArrayBuffer[PageView]()
  
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

// COMMAND ----------

sc.textFile("/mnt/lsde/wikimedia/pageview_complete/2018/2018-01/pageviews-20180131-user.bz2", 1).name

// COMMAND ----------

import scala.collection.mutable

val str = "/mnt/lsde/wikimedia/pageview_complete/2018/2018-01/pageviews-20180131-user.bz2"

str.split("/").getClass

// COMMAND ----------

sc
  .textFile("/mnt/lsde/wikimedia/pageview_complete/2018/2018-01/pageviews-20180131-user.bz2", 1)
  .flatMap(extractHours)
  .toDF()
  .repartitionByRange(4, col("hour"))
  .write
  .mode("overwrite")
  .parquet("/mnt/group09/test.parquet")

// COMMAND ----------

rdd.take(10).foreach(println)

// COMMAND ----------

val result = sc.parallelize(rdd.take(100)).toDF()

// COMMAND ----------

import scala.collection.mutable.ArrayBuffer
import scala.util.matching.Regex
import org.apache.spark.sql.Row

case class PageView(domain: String, title: String, pageID: Integer, accessType: String, hour: Integer, count: Integer)

def extractHours(row: String): ArrayBuffer[PageView] = {
  //val dirtyRow = ArrayBuffer[String](row.getString(0).stripLineEnd.split(" "): _*)
  val dirtyRow = ArrayBuffer[String](row.stripLineEnd.split(" "): _*)
  val counts = ArrayBuffer[PageView]()
  
  if (dirtyRow.length < 5) {
    return counts
  }
  
  if (dirtyRow.length == 5) {
    dirtyRow.insert(2, "null")
  }
  
  if (dirtyRow(2) == "null") {
    dirtyRow(2) = "-1"
  }
  
  
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

val r = rdd.flatMap(extractHours).toDF()

r.partition(1).mode("overwrite").parquet("/mnt/group09/test.parquet")

display(r)

// COMMAND ----------




val value = "A4B2C2D14E6F4G2H1I5J39K10L14M4N5O40P13Q11R6S7T2U5V14W5X4"
for (patternMatch <- summaryPattern.findAllMatchIn(value))
  println(s"key: ${patternMatch.group(1)(0).toInt - 65} value: ${patternMatch.group(2)}")

// COMMAND ----------

dbutils.fs.ls("/mnt/group09")

// COMMAND ----------

Array.getClass

// COMMAND ----------

val md = java.security.MessageDigest.getInstance("SHA-1")
md.digest("Hoger".getBytes("UTF-8")).to[Array].map("%02x".format(_)).mkString

// COMMAND ----------


