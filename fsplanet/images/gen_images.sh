#!/bin/bash
echo > index.html
find -type f | 
grep -v svn | 
while read x; do 
	echo "$x<br><img src='$x'><br>" >> index.html; 
done
