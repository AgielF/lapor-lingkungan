# --- Tahap 1: Build Stage ---
FROM node:18-alpine AS build-stage
WORKDIR /app

ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# --- SANGAT PENTING: HARUS ADA BARIS INI UNTUK MEMISAHKAN TAHAP ---
FROM nginx:stable-alpine 

# Sekarang Docker tahu ini adalah Tahap 2, jadi tidak akan ada "Circular Dependency"
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Salin konfigurasi Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]