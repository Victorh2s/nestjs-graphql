FROM node:22.14.0

WORKDIR /home/api

CMD npm run start:docker:dev

# Não defina CMD aqui (será sobrescrito pelo compose.yml)
