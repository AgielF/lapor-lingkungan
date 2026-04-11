package handler

import (
	"net/http"
	"os"
	"time"

	"lapor-lingkungan-backend/internal/config"
	"lapor-lingkungan-backend/internal/model"
	"lapor-lingkungan-backend/pkg/response"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

type RegisterInput struct {
	Nama     string `json:"nama" binding:"required"`
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
}

type LoginInput struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func Register(c *gin.Context) {
	var input RegisterInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, response.Error("Input tidak valid"))
		return
	}

	var existingUser model.User
	if err := config.DB.Where("email = ?", input.Email).First(&existingUser).Error; err == nil {
		c.JSON(http.StatusBadRequest, response.Error("Email sudah terdaftar!"))
		return
	}

	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)

	// Jika email admin, set role otomatis jadi admin (HANYA UNTUK TESTING LOKAL)
	role := "warga"
	if input.Email == "admin@puskesmas.com" {
		role = "admin"
	}

	newUser := model.User{
		Nama:     input.Nama,
		Email:    input.Email,
		Password: string(hashedPassword),
		Role:     role,
	}

	config.DB.Create(&newUser)
	c.JSON(http.StatusCreated, response.Sukses("Akun berhasil dibuat!", newUser.Email))
}

func Login(c *gin.Context) {
	var input LoginInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, response.Error("Email dan Password wajib diisi"))
		return
	}

	var user model.User
	if err := config.DB.Where("email = ?", input.Email).First(&user).Error; err != nil {
		c.JSON(http.StatusUnauthorized, response.Error("Email tidak ditemukan"))
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, response.Error("Password salah!"))
		return
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": user.ID,
		"role":    user.Role,
		"exp":     time.Now().Add(time.Hour * 24).Unix(),
	})

	tokenString, _ := token.SignedString([]byte(os.Getenv("JWT_SECRET")))

	c.JSON(http.StatusOK, response.Sukses("Login Berhasil", gin.H{
		"token": tokenString,
		"user": gin.H{"id": user.ID, "nama": user.Nama, "role": user.Role},
	}))
}
