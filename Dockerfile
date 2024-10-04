#!/bin/zsh
FROM alpine:3.19

ENV NODE_VERSION=22.3.0

RUN apk add nodejs npm

WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY ./build .