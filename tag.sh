#!/bin/bash
sed -i  "s/merge-branch:v.*/merge-branch:v${2}\"/" action.yml
sed -i  "s/merge-branch@v.*/merge-branch@v${2}\"/" README.md
git commit -a -m "${1}"
git tag -a -m "${1}" "v${2}"
git push --follow-tags

./docker_build.sh $2