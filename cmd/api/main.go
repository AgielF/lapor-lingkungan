package main

import (
	"log"
	"os"

	"lapor-lingkungan-backend/internal/config"
	"lapor-lingkungan-backend/internal/handler"
	"lapor-lingkungan-backend/internal/middleware"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()
	config.ConnectDB()

	r := gin.Default()

	// CORS Middleware
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	r.Static("/uploads", "./uploads")

	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{"pesan": "Selamat datang di API Lapor Lingkungan 🔥"})
	})

	api := r.Group("/api")
	{
		// 🔓 Akses Publik
		api.POST("/register", handler.Register)
		api.POST("/login", handler.Login)

		// 🔒 Akses Warga Terdaftar (Harus Bawa Token)
		protected := api.Group("")
		protected.Use(middleware.WajibLogin())
		{
			protected.POST("/lapor", handler.KirimLaporan)
			protected.GET("/laporanku", handler.GetLaporanKu)
		}

		// 👮 Akses Admin
		admin := api.Group("/admin")
		admin.Use(middleware.WajibLogin(), middleware.WajibAdmin())
		{
			admin.GET("/semua-laporan", handler.GetAllLaporan)
			admin.PUT("/laporan/:id/status", handler.UpdateStatusLaporan)
		}
	}

	port := os.Getenv("PORT")
	if port == "" { port = "8080" }
	log.Printf("🚀 Server menyala di http://localhost:%s\n", port)
	r.Run(":" + port)
}
