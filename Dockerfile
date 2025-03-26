FROM node:22.14.0

WORKDIR /home/api

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

# Não defina CMD aqui (será sobrescrito pelo compose.yml)
