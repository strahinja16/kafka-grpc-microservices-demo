FROM node:13.12.0-alpine

RUN apk add --update --no-cache \
    python \
    make \
    g++

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm ci

EXPOSE 3000
CMD [ "npm", "run", "start" ]
