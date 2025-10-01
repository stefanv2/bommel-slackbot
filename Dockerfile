FROM node:20-alpine

ENV TZ=Europe/Amsterdam
RUN apk add --no-cache tzdata

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "start"]

