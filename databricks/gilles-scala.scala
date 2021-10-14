// Databricks notebook source
import scala.collection.mutable.ArrayBuffer
import scala.util.matching.Regex
import org.apache.spark.sql.{Row, Column}
import org.apache.spark.sql.functions._

// COMMAND ----------

case class PageView(domain: String, title: String, pageID: Integer, accessType: String, hour: Integer, count: Integer)

object Job {
  def extractHours(row: String): ArrayBuffer[PageView] = {
    val counts = ArrayBuffer[PageView]()

    val validStart: Regex = raw"^[^ ]+ [^ ]+ ([0-9]* )?".r
    val validEnd: Regex = raw"[0-9]+ ([A-Z][0-9]+)+$$".r

    if ((validStart.findAllMatchIn(row).size != 0) & (validEnd.findAllMatchIn(row).size != 0)) {
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

val paths = Array(
  //"/mnt/lsde/wikimedia/pageview_complete/2019/2019-09/pageviews-20190905-user.bz2",
  "/mnt/lsde/wikimedia/pageview_complete/2019/2019-09/pageviews-20190906-user.bz2",
  "/mnt/lsde/wikimedia/pageview_complete/2019/2019-09/pageviews-20190907-user.bz2",
  "/mnt/lsde/wikimedia/pageview_complete/2019/2019-09/pageviews-20190908-user.bz2",
  "/mnt/lsde/wikimedia/pageview_complete/2019/2019-09/pageviews-20190909-user.bz2",
  "/mnt/lsde/wikimedia/pageview_complete/2019/2019-09/pageviews-20190910-user.bz2",
)

// COMMAND ----------

for (path <- paths) {
  val date = path.split("/").last.split("-")(1)
  val (year, month, day) = (date.substring(0, 4), date.substring(4, 6), date.substring(6))
  
  sc
    .textFile(path)
    .flatMap(Job.extractHours)
    .toDF()
    .withColumn("year", lit(year))
    .withColumn("month", lit(month))
    .withColumn("day", lit(day))
    .repartitionByRange(4, col("hour"))
    .sort("year", "month", "day", "hour")
    .write
    .mode("append")
    .partitionBy("year", "month", "day")
    .parquet("/mnt/group09/attack.parquet")
}

// COMMAND ----------

sc.parallelize

// COMMAND ----------

// MAGIC %python
// MAGIC 
// MAGIC from pathlib import Path
// MAGIC 
// MAGIC sum([sum([t.size for t in dbutils.fs.ls(str(f).strip("/dbfs"))]) for f in Path("/dbfs/mnt/group09/user.parquet").glob("year=*/month=*/day=*")]) // 2**30

// COMMAND ----------

val df = spark.read.parquet("/mnt/group09/user.parquet")

// COMMAND ----------

display(df
  .groupBy(col("domain"), col("day"))
  .agg(max("count").alias("max_count"))
  .orderBy(desc("max_count"))
)

// COMMAND ----------


