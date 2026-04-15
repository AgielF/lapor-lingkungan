package handler

import (
	"context"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"os"
	"strconv"
	"time"

	"lapor-lingkungan-backend/internal/config"
	"lapor-lingkungan-backend/internal/model"
	"lapor-lingkungan-backend/pkg/response"

	"cloud.google.com/go/storage"
	"github.com/gin-gonic/gin"
)

// --- Fungsi Pembantu untuk Upload ke GCS ---
func UploadToGCS(file *multipart.FileHeader) (string, error) {
	ctx := context.Background()
	bucketName := os.Getenv("GCS_BUCKET_NAME")

	client, err := storage.NewClient(ctx)
	if err != nil {
		return "", err
	}
	defer client.Close()

	f, err := file.Open()
	if err != nil {
		return "", err
	}
	defer f.Close()

	// Membuat nama file unik untuk di GCS
	objectName := fmt.Sprintf("laporan/%d-%s", time.Now().Unix(), file.Filename)

	sw := client.Bucket(bucketName).Object(objectName).NewWriter(ctx)
	if _, err := io.Copy(sw, f); err != nil {
		return "", err
	}
	if err := sw.Close(); err != nil {
		return "", err
	}

	// Mengembalikan URL publik
	return fmt.Sprintf("https://storage.googleapis.com/%s/%s", bucketName, objectName), nil
}

// --- Handler Kirim Laporan ---
func KirimLaporan(c *gin.Context) {
	userID, _ := c.Get("user_id")

	kategori := c.PostForm("kategori")
	latStr := c.PostForm("latitude")
	lngStr := c.PostForm("longitude")

	lat, _ := strconv.ParseFloat(latStr, 64)
	lng, _ := strconv.ParseFloat(lngStr, 64)

	file, err := c.FormFile("foto")
	if err != nil {
		c.JSON(http.StatusBadRequest, response.Error("Foto wajib diunggah"))
		return
	}

	// --- INTEGRASI GCS DIMULAI DI SINI ---
	urlFoto, err := UploadToGCS(file)
	if err != nil {
		// Log error di console backend untuk debugging
		fmt.Println("Error upload GCS:", err)
		c.JSON(http.StatusInternalServerError, response.Error("Gagal mengunggah foto ke Cloud Storage"))
		return
	}
	// -------------------------------------

	laporanBaru := model.Laporan{
		UserID:    uint(userID.(float64)),
		Kategori:  kategori,
		Latitude:  lat,
		Longitude: lng,
		FotoUrl:   urlFoto, // <-- Disimpan sebagai URL Publik GCS, bukan path lokal lagi
		Status:    "Terkirim",
	}

	config.DB.Create(&laporanBaru)
	c.JSON(http.StatusCreated, response.Sukses("Laporan berhasil diterima", laporanBaru))
}

// --- Handler Lainnya Tetap Sama ---
func GetLaporanKu(c *gin.Context) {
	userID, _ := c.Get("user_id")
	var laporans []model.Laporan

	config.DB.Where("user_id = ?", userID).Order("created_at desc").Find(&laporans)
	c.JSON(http.StatusOK, response.Sukses("Data history laporan Anda", laporans))
}

func GetAllLaporan(c *gin.Context) {
	var laporans []model.Laporan
	config.DB.Order("created_at desc").Find(&laporans)
	c.JSON(http.StatusOK, response.Sukses("Semua data laporan", laporans))
}

type UpdateStatusInput struct {
	Status string `json:"status" binding:"required"`
}

func UpdateStatusLaporan(c *gin.Context) {
	laporanID := c.Param("id")
	var input UpdateStatusInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, response.Error("Status tidak valid"))
		return
	}

	var laporan model.Laporan
	if err := config.DB.First(&laporan, laporanID).Error; err != nil {
		c.JSON(http.StatusNotFound, response.Error("Laporan tidak ditemukan"))
		return
	}

	laporan.Status = input.Status
	config.DB.Save(&laporan)
	c.JSON(http.StatusOK, response.Sukses("Status berhasil diupdate", laporan))
}
