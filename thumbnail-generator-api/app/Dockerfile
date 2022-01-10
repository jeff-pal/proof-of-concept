FROM node:14.18.1-alpine

WORKDIR /usr/thumbnail-generator-api

COPY . .

RUN npm install -g npm@latest
RUN npm install -g typescript
RUN npm install -g serverless
RUN npm run build