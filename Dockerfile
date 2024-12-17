# Usar una imagen base de Node.js
FROM node:14

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar el package.json y el package-lock.json
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Exponer el puerto en el que la aplicación se ejecutará
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]