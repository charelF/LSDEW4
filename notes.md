# Notes

2021-09-29

## [Dumps](https://dumps.wikimedia.org/other/pageview_complete/readme.html)

### Dump 1

a first dump is at the top of the page

> Maintained by the Wikimedia Analytics team [Link to the dumps](https://dumps.wikimedia.org/other/pageview_complete/)

https://dumps.wikimedia.org/other/pageview_complete/

- 3 files per day, [for example (jan 2021)](https://dumps.wikimedia.org/other/pageview_complete/2021/2021-01/):
    - ```pageviews-20210101-automated.bz2``` (~100MB compressed (bz2), **~500MB uncompressed**)
    - ```pageviews-20210101-spider.bz2``` (~1GB compressed (bz2))
    - ```pageviews-20210101-user.bz2``` (~500MB compressed (bz2))

- Notes:
    - download speed seems to be throttled a lot, took over few minutes to download the 1GB file (~2-3MB/s) despite being on a 300 mbit network (so ~35+MB/s possible)

### Dump 2

From [Wikistats: Pageview complete dumps](https://dumps.wikimedia.org/other/pageview_complete/readme.html):

> **Details on data segments**
> Sets of daily files are derived from the best data available at the time:
> - From 2007 to 2011: from pagecounts-raw (to be loaded during the second half of October 2020)
> - From 2011 to 2015: from pagecounts-ez
> - From 2015 to the present: from the latest pageview definition

Here we are interested in the last one

https://dumps.wikimedia.org/other/pageviews/

- Contains documentation: https://meta.wikimedia.org/wiki/Research:Page_view
- 1 file per hour, so 24 per day, [for example (jan 2021)](https://dumps.wikimedia.org/other/pageviews/2021/2021-01/):
    - ```pageviews-20210101-000000.gz``` (~00:30-01:30) (~40MB compressed (gz), **~150MB uncompressed**)
    - ... same for every hour

- Notes:
    - download speed seems to be throttled aswell, did not go over (~2-3MB/s)
    - MacOS seems to uncompress the .bz file immediately after download

## Files

### ```pageviews-[YYYYMMDD]-automated```








