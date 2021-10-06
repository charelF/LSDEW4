
---

# Better overview available in data-pageviews.md

---

# Data

We have identified 3 data sources for now.

- [Dump 1](#dump-1)
- [Dump 2](#dump-2)
- [Dump 3](#dump-3)

## Dump 1

### Location

https://dumps.wikimedia.org/other/pageview_complete/

### Documentation

Very limited information available on: https://dumps.wikimedia.org/other/pageview_complete/readme.html

### Files

#### Overview

3 files per day, [for example (jan 2021)](https://dumps.wikimedia.org/other/pageview_complete/2021/2021-01/):
- `pageviews-20210101-automated.bz2` (~100MB compressed (bz2), **~500MB uncompressed**)
- `pageviews-20210101-spider.bz2` (~1GB compressed (bz2))
- `pageviews-20210101-user.bz2` (~500MB compressed (bz2))


#### Example `pageviews-[YYYYMMDD]-automated`

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
- guessing the column contents:
    - 1: looks like a partially/non-abbreviated version of `domain_code1`
    - 2: pretty sure its `page_title`
    - 3: ??? maybe `count_views`
    - 4: could be `access_method`, in dump2 this is done with the `m` in first column (mobile page), but not even sure if they are the same
    - 5: ??? maybe `count_views`
    - 6: ???
- 8,353,208 lines
- 90MB compressed (bz2)
- 500MB uncompressed

#### Example `pageviews-[YYYYMMDD]-user`

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

#### Example `pageviews-[YYYYMMDD]-spider`

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

---

## Dump 2

### Location

https://dumps.wikimedia.org/other/pageviews/

### Documentation

Extensive documentation and information on: https://meta.wikimedia.org/wiki/Research:Page_view

### Files

#### Overview

2 files per hour, so 48 per day, [for example (jan 2021)](https://dumps.wikimedia.org/other/pageviews/2021/2021-01/):
- `pageviews-20210101-000000.gz` (~00:30-01:30) (~40MB compressed (gz), **~150MB uncompressed**)
- `projectviews-20210101-000000` (~00:30-01:30) (19KB uncompressed)

#### Example `pageviews-[YYYYMMDD]-[HHMMSS]`

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
    - 1: `domain_code1`: abbreviated domain of the request
    - 2: `page_title`: "title of the unnormalized part after /wiki/"
    - 3: `count_views`: number of page views in hour
    - 4: `total_response_size`: total response size caused by the requests for this page in the respective hour
- Example: ```de.m.voy Berlin 176 314159``` means 176 requests to "de.m.wikivoyage.org/wiki/Berlin", which accounted in total for 314159 response bytes
- Each domain_code and page_title pair occurs at most once
- The file is sorted by domain_code and page_title. Same Source
- there is a similar dataset that has been depreceated by now. [More Info](https://wikitech.wikimedia.org/wiki/Analytics/Archive/Data/Pagecounts-raw). Not the same as Dump1)
- Relevant to our Project:
    - > It filters out as many spiders and bots as we can detect
- 4,855,510 lines
- 40MB compressed (gz)
- 150MB uncompressed

#### Example `projectviews-[YYYYMMDD]-[HHMMSS]`

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

---

## Dump 3

### Location

[Private](https://wikitech.wikimedia.org/wiki/Analytics/Data_Lake/Traffic/Pageview_hourly)

### Documentation

Various:
- Research:Page view site: https://meta.wikimedia.org/wiki/Research:Page_view
- Wikitech site: https://wikitech.wikimedia.org/wiki/Analytics/Data_Lake/Traffic/Pageview_hourly
- MediaWikie site: https://www.mediawiki.org/wiki/Wikimedia_Product/Data_dictionary/pageviews_hourly

Summary:
- uses the schema described on the Research:Page view page exactly
- **stored in Parquet format**
- Contains data from 1 May 2015 until now, **however not publicly accessible as of 2018.** So there are 3 years public (in theory, but hard to find in practice) and 3 years private
- it seems that the main information that is thus not publicly available, as it is not in the other dumps, is:
    - `referer`: which page referred to Wikipedia: could be very relevant for DDOS detection, but can also be spoofed
    - `geolocation`: which country, city the IP address accessing the site is located in, could be very relevant to DDOS detection

---

## Notes

### Various

- For Dump1 and Dump2, download speed seems to be throttled, did not go over (~2-3MB/s), could be very problematic for downloading many large files
- Data changed over the years, according to [Wikistats: Pageview complete dumps](https://dumps.wikimedia.org/other/pageview_complete/readme.html):
    - > Sets of daily files are derived from the best data available at the time:
    - > From 2007 to 2011: from pagecounts-raw (to be loaded during the second half of October 2020)
    - > From 2011 to 2015: from pagecounts-ez
    - > From 2015 to the present: from the latest pageview definition

#### [Interesting and Relevant Blog post](https://techblog.wikimedia.org/2020/10/05/bot-or-not-identifying-fake-traffic-on-wikipedia/)

Blog post about identifying traffic types and differences between legitimate and illegitimate traffic. Particularly:
- > Up to April 2020, our classification for pageviews included only two types of actors: **“users”** and **“spiders”** (self-identified crawlers like Googlebot). Since all traffic not self-identified as “bot” was identified as “user,” quite a significant percentage of “bot spam” traffic was tagged as “user” traffic. This simple classification distorted our pageview numbers, as it made it seem that there was more user traffic than there really was. For example, we estimated that in 2019 between 5 to 8% of desktop pageviews in English Wikipedia tagged as “user” traffic was actually coming from “bot spammers/vandals.” That number could be as high as 800 pageviews a second. We continue processing and cataloging these requests, and **from April 2020 onwards the traffic we identify as coming from spammers** is tagged with the label **“automated.”** You can see here that it represents about 5% of total traffic. 
- > The community has been hard at work finding the characteristics of spammy traffic by hand for a while. For example,  a key factor in distinguishing “automated” versus “real user traffic” was assessing whether pages had similar pageview numbers in the desktop and mobile versions.
- they also mention an email address for any questions etc














