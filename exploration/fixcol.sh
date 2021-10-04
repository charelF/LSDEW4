#!/bin/zsh

# removed the 3rd column if present, resulting file should have exactly 5 columns everytime
# usage: ./fixcol.sh [inputfile] [outputfile]
# example: ./fixcol.sh "../data/test2.txt" "../data/test4.txt"
# before 1st usage: chmod +x fixcol.sh

sed -r "s/^(.+) (.+) (.+) (.+) (.+) (.+)$/\1 \2 \4 \5 \6/g" $1 > $2