FROM node:14.18.1-alpine

WORKDIR /usr/thumbnail-generator-ui

COPY . .

RUN npm install -g npm@latest
RUN npm install -g typescript
RUN npm install -g serve
RUN npm install
RUN npm run build