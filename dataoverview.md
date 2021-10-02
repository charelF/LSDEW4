# Overview of sizes of relevant Analytics Datasets

Source: https://dumps.wikimedia.org/other/analytics/

## Mediacounts

- 1 file per day, between 400 - 800 MB compressed, taking 600 MB as average
- back-of-the-envelope: 600 * 365 * 5 = ~1.1TB compressed
- script: 1303 GiB = 1.27TiB compressed
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

 estimates the count of unique devices that visit our sites without assigning unique IDs to users, in order to protect their privacy
 - 2 files per day, 1 containing clicks per domains, 1 containing clicks per project
 - script: 13 MiB (for unique devices per domain) (compressed but uncompressed similar size) (per project even smaller)

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

 - 32 GiB compressed


