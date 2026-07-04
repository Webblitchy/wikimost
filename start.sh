#!/bin/bash

docker kill wikimost-db-1 wikimost-redis-1 wikimost-wikimost-1 2>/dev/null
docker compose up -d

