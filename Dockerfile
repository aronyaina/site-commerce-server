# Project base
FROM node:18 AS Production_server

ENV NODE_ENV=production_server

# Creation de dossier
WORKDIR /usr/src/commercial-app/server

# Copy des package requis
COPY package*.json ./

# Production code
RUN npm ci --only=production

# Copie de tout les fichiers dans le directory
COPY . .

#Ouverture des ports
EXPOSE 3000

CMD ["node","server.js"]