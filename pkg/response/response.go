package response

import "github.com/gin-gonic/gin"

func Sukses(message string, data interface{}) gin.H {
	return gin.H{"status": "sukses", "message": message, "data": data}
}

func Error(message string) gin.H {
	return gin.H{"status": "gagal", "message": message}
}
