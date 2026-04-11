package handler

import (
	"fmt"
	"net/http"
	"path/filepath"
	"strconv"
	"time"

	"lapor-lingkungan-backend/internal/config"
	"lapor-lingkungan-backend/internal/model"
	"lapor-lingkungan-backend/pkg/response"

	"github.com/gin-gonic/gin"
)

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

	filename := fmt.Sprintf("%d_%s", time.Now().Unix(), filepath.Base(file.Filename))
	savePath := fmt.Sprintf("uploads/%s", filename)

	if err := c.SaveUploadedFile(file, savePath); err != nil {
		c.JSON(http.StatusInternalServerError, response.Error("Gagal menyimpan foto"))
		return
	}

	laporanBaru := model.Laporan{
		UserID:    uint(userID.(float64)),
		Kategori:  kategori,
		Latitude:  lat,
		Longitude: lng,
		FotoUrl:   savePath,
		Status:    "Terkirim",
	}

	config.DB.Create(&laporanBaru)
	c.JSON(http.StatusCreated, response.Sukses("Laporan berhasil diterima", laporanBaru))
}

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
