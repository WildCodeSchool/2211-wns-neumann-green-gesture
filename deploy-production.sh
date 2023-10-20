#!/bin/sh
git fetch origin && git reset --hard origin/main && git clean -f -d && \
docker compose -f docker-compose.production.yml down && \
docker rmi $(docker images -a -q) && \
docker compose -f docker-compose.production.yml pull && \
docker compose -f docker-compose.production.yml --env-file .env.production up -d;