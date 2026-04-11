package model

import (
	"time"
	"gorm.io/gorm"
)

type Laporan struct {
	ID        uint           `gorm:"primaryKey" json:"id"`
	UserID    uint           `gorm:"not null" json:"user_id"`
	Kategori  string         `gorm:"type:varchar(100);not null" json:"kategori"`
	Latitude  float64        `gorm:"not null" json:"latitude"`
	Longitude float64        `gorm:"not null" json:"longitude"`
	FotoUrl   string         `gorm:"type:varchar(255)" json:"foto_url"`
	Status    string         `gorm:"type:varchar(50);default:'Terkirim'" json:"status"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}
