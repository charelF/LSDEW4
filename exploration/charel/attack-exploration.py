# Databricks notebook source

# COMMAND ----------

# MAGIC %sh
# MAGIC pip install requests

# COMMAND ----------

from pyspark.sql.functions import col, asc, to_timestamp, year, month, dayofmonth

import requests
import datetime

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

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

testquery = df \
    .where(col("day") == 8) \
    .where(col("pageID")== 133264) \
    .show(100)

# COMMAND ----------

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

titlequery = df.where(col("title").isin(dos_ddos_titles))

# COMMAND ----------

titlequery.count()

# COMMAND ----------

titlequery.write.option("header", "true").csv("/mnt/group09/temp_c.csv")

# COMMAND ----------

# MAGIC %md
# MAGIC ## new pageviews delta

# COMMAND ----------

df = spark.read.format("delta").load("/mnt/group09/pageviews.delta")

# COMMAND ----------

maxts = df.agg({"timestamp": "max"}).first()[0]
mints = df.agg({"timestamp": "min"}).first()[0]

# COMMAND ----------

print(datetime.datetime.fromtimestamp(maxts))
print(datetime.datetime.fromtimestamp(mints))

# COMMAND ----------

views_per_hour = df\
    .groupby("timestamp")\
    .sum("count").withColumnRenamed("sum(count)", "sumCount").orderBy(asc("timestamp"))\
    .withColumn("date", to_timestamp(col("timestamp")))

# COMMAND ----------

unique_dates = views_per_hour.select(
    year("date").alias('year'), 
    month("date").alias('month'), 
    dayofmonth("date").alias('day')
)

# COMMAND ----------

display(unique_dates)

# COMMAND ----------

views_per_hour.write.csv("/mnt/group09/temp_c4.csv")

# COMMAND ----------

display(spark.read.csv("/mnt/group09/temp_c4.csv"))

# COMMAND ----------

df = views_per_hour.toDF("timestamp", "sumCount").toPandas()
type(df)

# COMMAND ----------

df["date"] = pd.to_datetime(df["timestamp"], unit="s")

plt.figure(figsize=(10,4))
plt.plot(df["date"], df["sumCount"], alpha=0.5)
plt.grid(which="both")
plt.show()