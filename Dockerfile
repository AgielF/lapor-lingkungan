# --- Tahap 1: Build Stage ---
FROM node:18-alpine AS build-stage
WORKDIR /app

# Ambil argumen dari GitHub Actions (untuk .env)
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# --- Tahap 2: Production Stage (Nginx) ---
# Tambahkan -v (verbose) atau pastikan output terlihat
RUN npm run build --v
# Salin hasil build dari tahap 1
COPY --from=build-stage /app/dist /usr/share/nginx/html
# Salin konfigurasi Nginx Anda
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]