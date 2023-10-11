package db

import (
	"fmt"
	"michaelpanik/veritone-shopping-list-api/models"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type DBInterface interface {
	FindAllItems() ([]models.Item, error)
	FindOneItemById(id int) (models.Item, error)
	CreateNewItem(item models.Item) (models.Item, error)
	DeleteItemById(id int) error
	UpdateItemById(id int, item models.Item) (models.Item, error)
}

type DBContext struct {
	db *gorm.DB
}

func NewDBContext() *DBContext {
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=America/Chicago", os.Getenv("DB_HOST"), os.Getenv("DB_USER"), os.Getenv("DB_PASSWORD"), os.Getenv("DB_NAME"), os.Getenv("DB_PORT"))
	fmt.Print(dsn)
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("Failed to connect to database")
	}

	db.AutoMigrate(&models.Item{})

	return &DBContext{
		db: db,
	}
}

func (db *DBContext) FindAllItems() ([]models.Item, error) {
	var items []models.Item
	result := db.db.Find(&items)
	return items, result.Error
}

func (db *DBContext) FindOneItemById(itemId int) (models.Item, error) {
	var item models.Item
	result := db.db.First(&item, itemId)
	return item, result.Error
}

func (db *DBContext) CreateNewItem(newItem models.Item) (models.Item, error) {
	item := models.Item{Name: newItem.Name, Description: newItem.Description, Quantity: newItem.Quantity, Purchased: newItem.Purchased}
	result := db.db.Create(&item)
	return item, result.Error
}

func (db *DBContext) DeleteItemById(itemId int) (bool, error) {
	var item models.Item
	result := db.db.Delete(&item, itemId)
	return true, result.Error
}

func (db *DBContext) UpdateItemById(itemId int, updatedItem models.Item) (models.Item, error) {
	var item models.Item
	db.db.First(&item, itemId)
	item.Name = updatedItem.Name
	item.Description = updatedItem.Description
	item.Quantity = updatedItem.Quantity
	item.Purchased = updatedItem.Purchased
	result := db.db.Save(&item)
	return item, result.Error
}
