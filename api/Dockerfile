FROM node:16.16.0

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 3001

CMD [ "node", "./index.js" ]