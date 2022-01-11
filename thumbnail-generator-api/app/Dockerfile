FROM node:14.18.1-alpine

WORKDIR /usr/thumbnail-generator-api

COPY . .

RUN npm install -g npm@latest --silent
RUN npm install -g typescript --silent
RUN npm install -g serverless --silent
RUN npm run build