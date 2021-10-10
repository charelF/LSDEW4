#!/bin/zsh

# regexp to filter a file and get all the bad lines
# can be used without the -v to only keep the good stuff
usage: ./filterbad.sh [inputfile] [outputfile]

grep -P --text -v "^[^ ]+ [^ ]+ ([0-9]* )?(mobile-web|mobile-app|desktop) [0-9]+ ([A-Z][0-9]+)+$" $1 > $2