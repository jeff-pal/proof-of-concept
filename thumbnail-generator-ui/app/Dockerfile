FROM node:14.18.1-alpine

WORKDIR /usr/thumbnail-generator-ui

COPY . .

RUN npm install -g npm@latest --silent
RUN npm install -g typescript --silent
RUN npm install -g serve --silent
RUN npm install --silent
RUN npm run build