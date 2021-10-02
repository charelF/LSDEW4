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


# Other relevant data

## Google Trends
- https://googletrends.github.io/data/
- Trending searches about all kinds of events, elections, movements, covid, ...
- also on Github: https://github.com/googletrends/data
- mostly smaller datasets (e.g. since they are on github, they are <100MB by definition)
- similar available via Google Cloud: https://cloud.google.com/blog/topics/developers-practitioners/make-informed-decisions-google-trends-data

## Twitter trending topics
- https://developer.twitter.com/en/docs/twitter-api/v1/trends/trends-for-location/api-reference/get-trends-place

