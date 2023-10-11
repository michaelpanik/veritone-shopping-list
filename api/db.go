package main

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type DBContext struct {
	db *gorm.DB
}

func NewDBContext() *DBContext {
	dsn := ""
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("Failed to connect to database")
	}

	db.AutoMigrate(&Item{})

	return &DBContext{
		db: db,
	}
}

var item Item
var items []Item

func (d *DBContext) FindOneItemById(itemId int) (Item, error) {
	result := d.db.First(&item, itemId)
	return item, result.Error
}

func (d *DBContext) FindAllItems() ([]Item, error) {
	result := d.db.Find(&items)
	return items, result.Error
}

func (d *DBContext) CreateNewItem(newItem Item) (Item, error) {
	item := Item{Name: newItem.Name, Description: newItem.Description, Quantity: newItem.Quantity, Purchased: newItem.Purchased}
	result := d.db.Create(&item)
	return item, result.Error
}

func (d *DBContext) UpdateItem(itemId int, updatedItem Item) (Item, error) {
	d.db.First(&item, itemId)
	item.Name = updatedItem.Name
	item.Description = updatedItem.Description
	item.Quantity = updatedItem.Quantity
	item.Purchased = updatedItem.Purchased
	result := d.db.Save(&item)
	return item, result.Error
}

func (d *DBContext) DeleteItemById(itemId int) (bool, error) {
	result := d.db.Delete(&Item{}, itemId)
	return true, result.Error
}
