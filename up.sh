#!/bin/bash
datehour_commit=$(date "+%Y-%m-%dT%H:%M:%S")
git add --all
git commit -m "Update: ${datehour_commit}"
# git push origin -u master


# echo $datehour_commit