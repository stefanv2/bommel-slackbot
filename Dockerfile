# Gebruik een lichte Node.js base image
FROM node:20-alpine

# Stel tijdzone in
ENV TZ=Europe/Amsterdam
RUN apk add --no-cache tzdata

# Maak app directory
WORKDIR /app

# Kopieer package.json en package-lock.json (als die er is)
COPY package*.json ./

# Installeer dependencies
RUN npm install

# Kopieer de rest van de code
COPY . .

# Expose de poort waarop de bot draait
EXPOSE 3002

# Start de bot via npm start (package.json heeft start script "node bommel.js")
CMD ["npm", "start"]

