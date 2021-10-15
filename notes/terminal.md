# Notes

## Terminal commands

```bzcat [bz compressed file] | head -n[number] > [outfile]```
- encode only [number] amount of lines from [bz compressed file] and write to [outfile]

```head -n10 pageviews-20210101-automated```
- read first 10 lines from file

``` cat pageviews-20210101-automated | wc -l ```
- count number of lines