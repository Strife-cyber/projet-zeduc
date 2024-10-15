# Étape 1 : Construction de l'application React
FROM node:14-alpine AS build

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers nécessaires
COPY package.json ./
COPY package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers du projet
COPY . ./

# Construire l'application pour la production
RUN npm run build

# Étape 2 : Serveur NGINX pour servir l'application
FROM nginx:alpine

# Copier les fichiers construits dans NGINX pour les servir
COPY --from=build /app/build /usr/share/nginx/html

# Exposer le port 80 pour accéder à l'application
EXPOSE 80

# Commande pour démarrer NGINX
CMD ["nginx", "-g", "daemon off;"]
