FROM node:12

WORKDIR /app

COPY . .

ENTRYPOINT ["npm","start"]
