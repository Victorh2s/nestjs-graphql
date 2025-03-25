FROM node:22.14.0

WORKDIR /home/api

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

CMD npm run start:dev

