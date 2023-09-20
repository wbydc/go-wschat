#!/bin/sh
docker compose -f "docker-compose.$1.yml" up -d
