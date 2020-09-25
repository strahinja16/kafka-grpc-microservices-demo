FROM node:12.18.3-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
RUN npm i react-scripts@3.4.1 -g --silent

COPY . ./
# start app
CMD ["npm", "run", "start"]