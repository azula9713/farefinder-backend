#!/bin/bash

echo "Pulling"
git pull origin master

echo "Building application"
docker-compose up -d --build
