# Tahap 1: Builder
FROM golang:1.22-alpine AS builder
WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o lapor-api cmd/api/main.go

# Tahap 2: Runner
FROM alpine:latest
WORKDIR /app

COPY --from=builder /app/lapor-api .

EXPOSE 8080
CMD ["./lapor-api"]