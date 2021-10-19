# Databricks notebook source
from pyspark.sql.functions import col, count, desc, asc, countDistinct

# COMMAND ----------

# MAGIC %sh
# MAGIC ls -lhS /dbfs/mnt/group09/attack-yoy.parquet

# COMMAND ----------

df = spark.read.parquet("/mnt/group09/attack-yoy.parquet")

# COMMAND ----------

# MAGIC %md
# MAGIC ## Investigating aggregated page views

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

# MAGIC %md
# MAGIC ## Exploring the [denial-of-service](https://www.wikidata.org/wiki/Q131406) topic

# COMMAND ----------

testquery = df\
.where(col("day") = 8)
.where(col("pageID")== 133264)\
.show(100)

# COMMAND ----------

# MAGIC %sh
# MAGIC pip install requests

# COMMAND ----------

import requests
def wikidata_qid_to_titles(qid):
    url = f"https://www.wikidata.org/wiki/Special:EntityData/{qid}.json"
    titles = []
    with requests.get(url, stream=True) as r:
        content = r.json()
        for _, sitedic in content["entities"][qid]["sitelinks"].items():
            title = sitedic["title"]
            title_without_space = title.replace(" ", "_")
            titles.append(title_without_space)
    return titles

# COMMAND ----------

                                         # dos                               # ddos
dos_ddos_titles = wikidata_qid_to_titles("Q131406") + wikidata_qid_to_titles("Q17329819")
dos_ddos_titles

# COMMAND ----------

titlequery = df\
.where(col("title").isin(dos_ddos_titles))

# COMMAND ----------

titlequery.count()

# COMMAND ----------

# display(titlequery)
titlequery.write.option("header", "true").csv("/mnt/group09/temp_c.csv")

# COMMAND ----------


