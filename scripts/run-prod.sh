#!/bin/bash

docker-compose stop
docker image prune -a -f
docker-compose -f docker-compose.yml up --build --remove-orphans -d