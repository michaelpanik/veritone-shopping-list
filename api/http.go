package main

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type Item struct {
	gorm.Model
	Name        string `json:"name"`
	Description string `json:"description"`
	Quantity    int    `json:"quantity"`
	Purchased   bool   `json:"purchased"`
}

type GetAllItemsResponseObject struct {
	Status int    `json:"status"`
	Data   []Item `json:"data"`
}

type GetOneItemResponseObject struct {
	Status int  `json:"status"`
	Data   Item `json:"data"`
}

type AddItemResponseObject struct {
	Status int  `json:"status"`
	Data   Item `json:"data"`
}

type DeleteItemResponseObject struct {
	Status  int    `json:"status"`
	Message string `json:"message"`
}

type UpdateItemResponseObject struct {
	Status int  `json:"status"`
	Data   Item `json:"data"`
}

type ErrorResponseObject struct {
	Status  int    `json:"status"`
	Message string `json:"message"`
}

type ServerInterface interface {
	GetAllItems(c *gin.Context) error
	AddItem(c *gin.Context) error
	DeleteItem(c *gin.Context, id int)
	UpdateItem(c *gin.Context)
}

func (db *DBContext) GetAllItems(c *gin.Context) {
	items, error := db.FindAllItems()

	if error != nil {
		c.JSON(http.StatusNotFound, ErrorResponseObject{Status: http.StatusNotFound, Message: "No such item found"})
	} else {
		c.JSON(http.StatusOK, GetAllItemsResponseObject{Status: http.StatusOK, Data: items})
	}
}

func (db *DBContext) GetOneItem(c *gin.Context) {
	id, _ := strconv.Atoi(c.Params.ByName("id"))
	item, error := db.FindOneItemById(id)

	if error != nil {
		c.JSON(http.StatusNotFound, ErrorResponseObject{Status: http.StatusNotFound, Message: "No such item found"})
	} else {
		c.JSON(http.StatusOK, GetOneItemResponseObject{Status: http.StatusOK, Data: item})
	}
}

func (db *DBContext) AddItem(c *gin.Context) {
	var newItem struct {
		Name        string `json:"name" binding:"required"`
		Description string `json:"description"`
		Quantity    int    `json:"quantity"`
		Purchased   bool   `json:"purchased"`
	}

	if c.Bind(&newItem) == nil {

		createdItem, error := db.CreateNewItem(Item{
			Name:        newItem.Name,
			Description: newItem.Description,
			Quantity:    newItem.Quantity,
			Purchased:   newItem.Purchased,
		})

		if error != nil {
			c.JSON(http.StatusUnprocessableEntity, ErrorResponseObject{Status: http.StatusUnprocessableEntity, Message: "No such item found"})
		} else {
			c.JSON(http.StatusCreated, AddItemResponseObject{Status: http.StatusCreated, Data: createdItem})
		}
	}

}

func (db *DBContext) DeleteItem(c *gin.Context) {
	id := c.Params.ByName("id")
	_, error := db.DeleteItemById(id)

	if error != nil {
		c.JSON(http.StatusNotFound, ErrorResponseObject{Status: http.StatusNotFound, Message: "No such item found"})
	} else {
		c.JSON(http.StatusAccepted, DeleteItemResponseObject{Status: http.StatusAccepted, Message: "Resource deleted successfully."})
	}
}

func (db *DBContext) UpdateItem(c *gin.Context) {
	id := c.Params.ByName("id")

	var newItem struct {
		Name        string `json:"name" binding:"required"`
		Description string `json:"description"`
		Quantity    int    `json:"quantity"`
		Purchased   bool   `json:"purchased"`
	}

	if c.Bind(&newItem) == nil {
		updatedItem, error := db.UpdateItemById(id, Item{
			Name:        newItem.Name,
			Description: newItem.Description,
			Quantity:    newItem.Quantity,
			Purchased:   newItem.Purchased,
		})

		if error != nil {
			c.JSON(http.StatusNotFound, ErrorResponseObject{Status: http.StatusNotFound, Message: "No such item found"})
		} else {
			c.JSON(http.StatusOK, UpdateItemResponseObject{Status: http.StatusOK, Data: updatedItem})
		}
	}
}
