# Project base
FROM node:18 AS production_server

# Variables d'environnement dans docker
ENV NODE_ENV=production_server

# Creation de dossier
WORKDIR /usr/src/commercial-app/server

# Copy des package requis
COPY package*.json ./

# Copy des package requis
COPY .env ./

# Production code
RUN npm ci --only=production

# Copie de tout les fichiers dans le directory
COPY . .

#Ouverture des ports
EXPOSE 5000

CMD ["node","server.js"]