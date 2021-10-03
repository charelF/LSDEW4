# Overview of sizes of relevant Wikipedia Analytics Datasets

Source: https://dumps.wikimedia.org/other/analytics/

## Mediacounts

- 1 file per day, between 400 - 800 MB compressed, taking 600 MB as average
- back-of-the-envelope: 600 * 365 * 5 = ~1.1TB compressed
- script: 1303 GiB = **1.27TiB compressed**
- when uncompressed, size * 5

```
/favicon.ico	2023141608	1369447	1369447	0	-	-	0	889963	2444	477040
/math/0/0/0/000004972bb9d24136dabf97020d6133.png	8890	14	14	14	0	0
/math/0/0/0/000014629cf0e69db83988f57889940c.png	2280	3	3	0
/math/0/0/0/000016c0ae64c0f6aff11053f6da23e1.png	1689	3	3	0
/math/0/0/0/00001b254aa18824e7a7043359be8d39.png	434	1	1	0
/math/0/0/0/00001db0f385fd97043041894d32c0e1.png	403	1	1	0
/math/0/0/0/00002ac95e3955d09c040409037d3f3d.png	10780	14	14	12	1	1
/math/0/0/0/000031460dc1fece735e07b7cd6e93ea.png	654	1	1	0
/math/0/0/0/000035bda5fd6d1fc27acfb00ea1e849.png	9628	29	29	29	0	0
/math/0/0/0/00004609127828c883c6d6bf7d12f125.png	4272	8	8	0
```

## Unique devices

>  estimates the count of unique devices that visit our sites without assigning unique IDs to users, in order to protect their privacy

 - 2 files per day, 1 containing clicks per domains, 1 containing clicks per project
 - from 2017-04 until now
 - script: **13 MiB** (for unique devices per domain) (compressed but uncompressed similar size) (per project even smaller)

example of per project for 1 day
```
wikipedia	127384813	45297861	172682674
wiktionary	995927	1816324	2812251
wikisource	301002	455787	756789
wikibooks	137659	379883	517542
wikiquote	95856	227380	323236
wikidata	70413	184186	254599
wikiversity	59162	130554	189716
mediawiki	56458	63681	120139
wikinews	51824	66930	118754
wikivoyage	50365	66082	116447
```


 ## Clickstream

 - documentation: [1](https://meta.wikimedia.org/wiki/Research:Wikipedia_clickstream)
 - data from 2017-11 until now
 - 1 file per month per domain (only 10 available: `en`, `de`, `fr`, ...)
 - script: **32 GiB compressed**, 5-6 times larger when uncompressed

```
other-empty	Pantherstaaten	external	52
other-search	Monaco-Marathon	external	16
Griffith_Park	Mission_Trails_Regional_Park	link	17
Isle_of_Man_TT	Matchless	link	11
other-search	Matchless	external	188
Karl-Heinz_Kalbfell	Matchless	link	11
other-empty	Matchless	external	75
FSV_Salmrohr	Markus_Koster	link	11
other-search	Kloster_Oetenbach	external	45
other-empty	Kloster_Oetenbach	external	16
```

---

# Other relevant data

## Google Trends
- https://googletrends.github.io/data/
- Trending searches about all kinds of events, elections, movements, covid, ...
- also on Github: https://github.com/googletrends/data
- mostly smaller datasets (e.g. since they are on github, they are <100MB by definition)
- similar available via Google Cloud: https://cloud.google.com/blog/topics/developers-practitioners/make-informed-decisions-google-trends-data

## Twitter trending topics
- https://developer.twitter.com/en/docs/twitter-api/v1/trends/trends-for-location/api-reference/get-trends-place

---

# Public Pageviews

## Pageview complete [```/other/pageview_complete/```](https://dumps.wikimedia.org/other/pageviews/)

- > Pageview complete is our best effort to provide a comprehensive timeseries of per-article pageview data for Wikimedia projects. Data spans from December 2007 to the present with a uniform format and compression.
- **Documentation**: https://dumps.wikimedia.org/other/pageview_complete/readme.html
- **Period**: 2011-12 - NOW
    - 2011-12 - 2015-04: only the `user` file, 1 file per day
    - 2015-05 - 2020-05: `user` and `spider` distinction, 2 files per day
    - 2020-06 - NOW: `user`, `spider` and `automated` distinction, 3 files per day
    - > From 2007 to 2011: from pagecounts-raw (to be loaded during the second half of October 2020)
    - > From 2011 to 2015: from pagecounts-ez
    - > From 2015 to the present: from the latest pageview definition
- available as daily files and monthly files
- details https://dumps.wikimedia.org/other/pageview_complete/readme.html
- > **KNOWN ISSUE:** rows without Page IDs have only 5 columns, while rows with Page IDs have 6. We are applying a fix which will take some time.
- sample (daily `automated` from 2021):
```
aa.wikibooks Main_Page null desktop 8 F8
aa.wikibooks Special:Book null desktop 1 F1
aa.wikibooks Special:CiteThisPage null desktop 1 F1
aa.wikibooks Special:DownloadAsPdf null desktop 1 F1
aa.wikibooks Special:SpecialPages null desktop 1 F1
```
- sample (daily `user` from 2011):
```
aa.wikibooks File%3AWikisource-logo.svg desktop 1 K1
aa.wikibooks File:Commons-logo.svg desktop 1 H1
aa.wikibooks File:Incubator-notext.svg desktop 3 A1W1X1
aa.wikibooks File:Microbutton_Wikiversity_2_green.gif desktop 1 V1
aa.wikibooks File:Wikibooks-logo.svg desktop 1 L1
```
- sample (monthly `automated` from 2012):
```
aa.wikibooks Main_Page null desktop 171 A8B6C8F8H23I1J8L8N31O8Q8S14V8X8Z8\8_8
aa.wikibooks Main_Page null mobile-web 4 E3\1
aa.wikibooks Special:AbuseLog null desktop 1 N1
aa.wikibooks Special:AllPages null desktop 1 N1
aa.wikibooks Special:AncientPages null desktop 1 N1
```
- 5 (or 6) columsn with
    - `wiki code (subproject.project)`
    - `article title`
    - (`page id`) **This column is not always present!!**
    - `device`
    - `daily total`
    - `hourly counts`


## Pagecounts-raw [```/other/pagecounts-raw/```](https://dumps.wikimedia.org/other/pagecounts-raw/)

- **Period**: 2007-12 - 2016-08
- **Documentation**: https://dumps.wikimedia.org/other/pagecounts-raw/
- > the first column "fr.b" is the project name
- > The second column is the title of the page retrieved, the third column is the number of requests, and the fourth column is the size of the content returned
- 1 file per hour
- sample:
```fr.b Special:Recherche/Achille_Baraguey_d%5C%27Hilliers 1 624
fr.b Special:Recherche/Acteurs_et_actrices_N 1 739
fr.b Special:Recherche/Agrippa_d/%27Aubign%C3%A9 1 743
fr.b Special:Recherche/All_Mixed_Up 1 730
```

## Pagecounts-ez [```/other/pagecounts-ez/```](https:dumps.wikimedia.org/other/pagecounts-ez/)

- **DEPRECATED**:
    - > This dataset has had some problems and we are no longer generating new data, since September 2020. We are phasing it out in favor of Pageviews Complete
- **Period**: 
    - 2007-12 - 2015-04: links to [```/other/pagecounts-raw/```](#Pagecounts-raw)
    - 2015-05 - NOW: links to [```other/pageviews/```](#Pageview)
- **Documentation**: https://dumps.wikimedia.org/other/pagecounts-ez/

## Pagecounts-ez-merged [```/other/pagecounts-ez/merged/```](https://dumps.wikimedia.org/other/pagecounts-ez/merged/)

- > Hourly page views per article for around 30 million article titles (Sept 2013) in around 800+ Wikimedia wikis. Repackaged (with extreme shrinkage, without losing granularity), corrected, reformatted. Daily files and two monthly files
- **Documentation**:  https://dumps.wikimedia.org/other/pagecounts-ez/
- **Period**: 2011-11 - 2020-09
- is mentioned only on [Pagecounts-ez](#Pagecounts-ez)
- also most likely **DEPRECATED**


## Pagecounts-ez-projectcount [```/other/pagecounts-ez/projectcounts/```](https://dumps.wikimedia.org/other/pagecounts-ez/projectcounts/)

- > Hourly page views per wiki, corrected for site outages and underreporting. Also repackaged, as one tar file per year.
- **Documentation**:  https://dumps.wikimedia.org/other/pagecounts-ez/ and a readme: https://dumps.wikimedia.org/other/pagecounts-ez/projectcounts/readme.txt
- **Period**: 2008 - 2016
- 1 file per year

## Pagecounts-ez-wikistats [```/other/pagecounts-ez/wikistats/```](https://dumps.wikimedia.org/other/pagecounts-ez/wikistats/)

- very confusing files




## Pageviews [```/other/pageviews/```](https://dumps.wikimedia.org/other/pageviews/)

- > filtered to only human traffic: It filters out as many spiders and bots as we can detect
- **Documentation**:  very minimal: https://dumps.wikimedia.org/other/pageviews/readme.html, more elaborate: https://wikitech.wikimedia.org/wiki/Analytics/Data_Lake/Traffic/Pageviews
- **Period**: 2015-05 - NOW
- 1 file per hour
- > They are also available in a highly compressed format that preserves all data: pagecounts-ez. The pagecounts-ez format is ideal for anyone looking to download lots of pageview data, whereas the pageviews data is easier to use if you only want to look at a few hours.
- sample:
```
aa - 3 0
aa Main_Page 8 0
aa Special:CiteThisPage 1 0
aa Special:UserLogin 1 0
aa Wikipedia:Community_Portal 1 0
```
- 4 columns with: 
    - `domain_code`
    - `page_title`
    - `count_views`
    - `total_response_size`


## Pagecounts-all-sizes [```/other/pagecounts-all-sites/```](https://dumps.wikimedia.org/other/pagecounts-all-sites/)

- > **Deprecated**
- like ```pagecounts-raw```, but also collects mobile data
- **Documentation**: short readme: https://dumps.wikimedia.org/other/pagecounts-all-sites/README.txt, more: https://wikitech.wikimedia.org/wiki/Analytics/Archive/Data/Pagecounts-all-sites
- **Period**: 2014-09 - 2016-08
