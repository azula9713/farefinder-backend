#!/bin/bash

echo "Pulling"
git pull origin

echo "Building application"
docker-compose up -d --build
