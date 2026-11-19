#!/bin/bash

if [[ "$(docker ps | grep wikimost-wikimost | wc -l)" == '1' ]]; then
  # Avoids to remove all data if containers stopped
  docker system prune -af --volumes
fi
docker kill wikimost-db-1 wikimost-redis-1 wikimost-wikimost-1 2>/dev/null
docker compose up -d --build

