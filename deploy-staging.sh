#!/bin/sh
git fetch origin && git reset --hard origin/dev && git clean -f -d && \
docker compose -f docker-compose.staging.yml down && \
docker rmi $(docker images -a -q) && \
docker compose -f docker-compose.staging.yml pull && \
docker compose -f docker-compose.staging.yml --env-file .env.staging up -d;