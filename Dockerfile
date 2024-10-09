FROM node:20-alpine AS base

WORKDIR /usr/src/app

ARG ENVIRONMENT
ENV ENVIRONMENT_FOR_RUNTIME $ENVIRONMENT

COPY package.json  ./
COPY package-lock.json  ./

RUN npm install

COPY . .

RUN npm run build:$ENVIRONMENT

EXPOSE 	3000

CMD npm run start:$ENVIRONMENT_FOR_RUNTIME
