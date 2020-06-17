FROM node:12.18.0-alpine

WORKDIR /app

COPY package*.json /app/

RUN npm i 

COPY . /app
