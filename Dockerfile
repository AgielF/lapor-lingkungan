# Tahap 1: Builder - Kita ganti ke versi 1.23 atau 1.24 (yang sudah mendukung 1.25 toolchain)
FROM golang:1.23-alpine AS builder

# Install build-base untuk library C jika diperlukan
RUN apk add --no-cache build-base

WORKDIR /app

# Salin semua file termasuk vendor
COPY . .

# Build binary Go
# Tambahkan GOTOOLCHAIN=auto agar Docker bisa mendownload SDK 1.25 jika diperlukan secara otomatis
ENV GOTOOLCHAIN=auto
# GANTI MENJADI INI (Hapus -mod=vendor):
RUN CGO_ENABLED=0 GOOS=linux go build -v -o lapor-api ./cmd/api/main.go
# Tahap 2: Runner
# Tahap 2: Runner
FROM alpine:latest
# Install tzdata agar zona waktu Asia/Jakarta dikenali
RUN apk add --no-cache tzdata

WORKDIR /app
COPY --from=builder /app/lapor-api .

# Set environment variable agar aplikasi menggunakan zona waktu yang benar
ENV TZ=Asia/Jakarta

EXPOSE 8080
CMD ["./lapor-api"]