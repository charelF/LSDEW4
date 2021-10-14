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

extractHours("en.wikipedia abc 111765 desktop 1 A1T1\n")

// COMMAND ----------

sc
.textFile("/FileStore/group09/samples/cleansample.txt", 1)  // .textFile("/mnt/lsde/wikimedia/pageview_complete/2019/2019-09/pageviews-20190907-user.bz2", 1)
.flatMap(extractHours)
.toDF()
.repartitionByRange(4, col("hour"))
.write
.mode("overwrite")
.parquet("/mnt/group09/pageviews-20190907-user.parquet")

// COMMAND ----------

// MAGIC %sh
// MAGIC ls -lhS /dbfs/mnt/group09

// COMMAND ----------

// MAGIC %sh
// MAGIC ls -lhS /dbfs/mnt/group09/pageviews-20190907-user.parquet

// COMMAND ----------

// MAGIC %sh
// MAGIC ls -lhS /dbfs/FileStore/group09/samples

// COMMAND ----------

// MAGIC %sh
// MAGIC head /dbfs/FileStore/group09/samples/cleansample.txt

// COMMAND ----------


