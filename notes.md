# Notes

2021-09-29

## Dumps

On: https://dumps.wikimedia.org/other/pageview_complete/readme.html

a first dump is at the top of the page

> Maintained by the Wikimedia Analytics team Link to the dumps

### Dump 1

https://dumps.wikimedia.org/other/pageview_complete/

- 3 files per day, [for example (jan 2021)](https://dumps.wikimedia.org/other/pageview_complete/2021/2021-01/):
    - `pageviews-20210101-automated.bz2` (~100MB compressed (bz2), **~500MB uncompressed**)
    - `pageviews-20210101-spider.bz2` (~1GB compressed (bz2))
    - `pageviews-20210101-user.bz2` (~500MB compressed (bz2))

- Notes:
    - download speed seems to be throttled a lot, took over few minutes to download the 1GB file (~2-3MB/s) despite being on a 300 mbit network (so ~35+MB/s possible)

---

lower on the page is another dump

From [Wikistats: Pageview complete dumps](https://dumps.wikimedia.org/other/pageview_complete/readme.html):

> **Details on data segments**
> Sets of daily files are derived from the best data available at the time:
> - From 2007 to 2011: from pagecounts-raw (to be loaded during the second half of October 2020)
> - From 2011 to 2015: from pagecounts-ez
> - From 2015 to the present: from the latest pageview definition

Here we are interested in the last one

### Dump 2

https://dumps.wikimedia.org/other/pageviews/

- [Documentation](https://meta.wikimedia.org/wiki/Research:Page_view)
- 2 files per hour, so 48 per day, [for example (jan 2021)](https://dumps.wikimedia.org/other/pageviews/2021/2021-01/):
    - `pageviews-20210101-000000.gz` (~00:30-01:30) (~40MB compressed (gz), **~150MB uncompressed**)
    - `projectviews-20210101-000000` (~00:30-01:30) (19KB uncompressed)

- Notes:
    - download speed seems to be throttled aswell, did not go over (~2-3MB/s)
    - Minor thing, but MacOS seems to uncompress the .bz file immediately after download, can find the .bz file in bin automatically


### Dump 3

On the [Section6 on the Research:Page view](https://meta.wikimedia.org/wiki/Research:Page_view#Data_sources_that_use_this_definition) links to a [Hive database with page data](https://wikitech.wikimedia.org/wiki/Analytics/Data_Lake/Traffic/Pageview_hourly)
- uses the schema described on the Research:Page view page exactly
- **stored in Parquet forma**
- **However not publicly accessible as of 2018**
- but it **links to code that is used to generate this database** (See "See also" section at bottom)

## Files

### Dump 1 `pageviews-[YYYYMMDD]-automated`

```
aa.wikibooks Main_Page null desktop 8 F8
aa.wikibooks Special:Book null desktop 1 F1
aa.wikibooks Special:CiteThisPage null desktop 1 F1
aa.wikibooks Special:DownloadAsPdf null desktop 1 F1
aa.wikibooks Special:SpecialPages null desktop 1 F1
aa.wikibooks Special:UserLogin null desktop 1 F1
aa.wikipedia Special:Statistics null desktop 24 A1B1C1D1E1F1G1H1I1J1K1L1M2O1P1Q1R1S1T1U2W1X1
ab.wikipedia 1759 7945 desktop 11 U11
ab.wikipedia Ашаблон:POL 3983 desktop 1 M1
ab.wikipedia Ашаблон:Абираҟдырга/Польша 3947 desktop 1 M1
```

- 6 columns
- 8,353,208 lines
- 90MB compressed (bz2)
- 500MB uncompressed

### Dump 1 `pageviews-[YYYYMMDD]-user`

```
aa.wikibooks - null mobile-web 4 I1O2R1
aa.wikibooks File:Wikimania.svg null mobile-web 1 I1
aa.wikibooks Main_Page null desktop 168 A5B1C3E5F3G3H4I3J2K68L35M2N2O5P7Q1R3S2T2U4V2W2X4
aa.wikibooks Main_Page null mobile-web 9 C1F1I2Q2T2U1
aa.wikibooks Special:CiteThisPage null mobile-web 1 Q1
aa.wikibooks Special:CreateAccount null desktop 34 A2B1C2F2G2H4I2J1L1N1O1R4T1U3V2W3X2
aa.wikibooks Special:Log null mobile-web 1 T1
aa.wikibooks Special:Log/block null desktop 1 H1
aa.wikibooks Special:Search null mobile-web 1 I1
aa.wikibooks Special:UserLogin null desktop 36 A2B1C2F2G2H4I2J1K1L2N1O1R4T1U3V2W3X2
```

- 6 columns
- 36,859,696 lines
- 500MB compressed (bz2)
- 2.3GB uncompressed

### Dump 1 `pageviews-[YYYYMMDD]-spider`

```
aa.wikibooks File:14-02-05-straszburg-RalfR-010.jpg null mobile-web 1 P1
aa.wikibooks File:Baku4_meetup11.JPG null mobile-web 1 Q1
aa.wikibooks File:Cquote1.svg null mobile-web 1 T1
aa.wikibooks File:Cscr-featured.svg null mobile-web 1 W1
aa.wikibooks File:Die_Wikipedianer_kommen_37.JPG null mobile-web 1 O1
aa.wikibooks File:Espera-Artículo_bueno.svg null mobile-web 1 B1
aa.wikibooks File:Silver_Medal.svg null mobile-web 1 Q1
aa.wikibooks File:User-info.svg null desktop 1 B1
aa.wikibooks File:Wikimedia_Community_Logo.svg null desktop 1 H1
aa.wikibooks File:Wikisource-logo.svg null desktop 2 C1D1
```

- 6 columns
- 81,776,243 lines
- 1GB compressed (bz2)
- 5.3 GB uncompressed

### Dump 2 `pageviews-[YYYYMMDD]-[HHMMSS]`

```
aa - 3 0
aa Main_Page 8 0
aa Special:CiteThisPage 1 0
aa Special:UserLogin 1 0
aa Wikipedia:Community_Portal 1 0
aa Wikipedia:Sandbox 1 0
aa.b Main_Page 1 0
aa.m Main_Page 1 0
aa.m Wikipedia:Sandbox 1 0
aa.m.b User:Sir_Lestaty_de_Lioncourt 1 0
```

- 4 columns, [Explanation](https://wikitech.wikimedia.org/wiki/Analytics/Data_Lake/Traffic/Pageviews):
    - `domain_code1`: abbreviated domain of the request
    - `page_title`: "title of the unnormalized part after /wiki/"
    - `count_views`: number of page views in hour
    - `total_response_size`: total response size caused by the requests for this page in the respective hour

- Example: ```de.m.voy Berlin 176 314159``` means 176 requests to "de.m.wikivoyage.org/wiki/Berlin", which accounted in total for 314159 response bytes
- Each domain_code and page_title pair occurs at most once
- The file is sorted by domain_code and page_title. Same Source
- there is a similar dataset that has been depreceated by now. [More Info](https://wikitech.wikimedia.org/wiki/Analytics/Archive/Data/Pagecounts-raw). Not the same as Dump1)
- Relevant to our Project! **It filters out as many spiders and bots as we can detect**
- 4,855,510 lines
- 40MB compressed (gz)
- 150MB uncompressed


### Dump 2 `projectviews-[YYYYMMDD]-[HHMMSS]`

```
aa - 3 0
aa - 15 0
aa.b - 1 0
aa.m - 2 0
aa.m.b - 1 0
ab - 49 0
ab.m - 26 0
ace - 54 0
ace.m - 31 0
ady - 56 0
ady.m - 7 0
```

- 4 columns
- 1,485 lines
- 19KB uncompressed
- seems like summary/aggregation of pageviews


## Various:

### Terminal Commands

- read first 10 lines: ``` head -n10 pageviews-20210101-automated ```
- count number of lines: ``` cat pageviews-20210101-automated | wc -l ```












