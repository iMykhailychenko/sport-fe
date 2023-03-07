#!/bin/bash

cd /home/sport-fe || exit 1

git pull

docker-compose stop
docker image prune -a -f
docker-compose -f docker-compose.yml up --build --remove-orphans -d