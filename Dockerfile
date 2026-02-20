# Imatge base lleugera
FROM node:20-alpine

# Carpeta de treball
WORKDIR /app

# Copiar dependències
COPY package*.json ./

# Instal·lar dependències
RUN npm install

# Copiar projecte
COPY . .

# Build de producció
RUN npm run build

# Exposar port
EXPOSE 3000

# Comanda d'inici
CMD ["npm", "start"]