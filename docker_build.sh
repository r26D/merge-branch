#!/bin/bash

#Push to github
docker build -t "docker.pkg.github.com/r26d/merge-branch/merge-branch:v${1}" .
docker build -t "docker.pkg.github.com/r26d/merge-branch/merge-branch:latest" .
docker push "docker.pkg.github.com/r26d/merge-branch/merge-branch:latest"
docker push "docker.pkg.github.com/r26d/merge-branch/merge-branch:v${1}"

##Push to docker
docker build -t "delmendo/merge-branch:v${1}" .
docker build -t delmendo/merge-branch:latest .
docker push delmendo/merge-branch:latest
docker push "delmendo/merge-branch:v${1}"
