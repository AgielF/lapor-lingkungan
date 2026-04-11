package config

import (
	"fmt"
	"log"
	"os"

	"lapor-lingkungan-backend/internal/model"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Jakarta",
		os.Getenv("DB_HOST"), os.Getenv("DB_USER"), os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"), os.Getenv("DB_PORT"),
	)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Gagal terkoneksi ke Database: ", err)
	}

	fmt.Println("✅ Koneksi Database Berhasil!")

	// Auto Migrate 2 Tabel sekaligus
	err = db.AutoMigrate(&model.User{}, &model.Laporan{})
	if err != nil {
		log.Fatal("Gagal melakukan migrasi tabel: ", err)
	}
	
	fmt.Println("✅ Migrasi Tabel Berhasil!")
	DB = db
}
