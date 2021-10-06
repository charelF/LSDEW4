# Public Pageviews

## Pageview complete [```/other/pageview_complete/```](https://dumps.wikimedia.org/other/pageview_complete/)

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
