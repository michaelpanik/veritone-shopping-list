package main

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type Item struct {
	gorm.Model
	Id          int
	Name        string
	Description string
	Quantity    int
	Purchased   bool
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

type HTTPContext struct {
	c  *gin.Context
	db *DBContext
}

func NewHTTPContext(c *gin.Context, db *DBContext) *HTTPContext {
	return &HTTPContext{
		c:  c,
		db: db,
	}
}

func (c *HTTPContext) GetAllItems() {
	items, error := c.db.FindAllItems()

	if error != nil {
		c.c.JSON(http.StatusNotFound, ErrorResponseObject{Status: http.StatusNotFound, Message: "No such item found"})
	} else {
		c.c.JSON(http.StatusOK, GetAllItemsResponseObject{Status: http.StatusOK, Data: items})
	}
}

func (c *HTTPContext) GetOneItem() {
	id, _ := strconv.Atoi(c.c.Params.ByName("id"))
	item, error := c.db.FindOneItemById(id)

	if error != nil {
		c.c.JSON(http.StatusNotFound, ErrorResponseObject{Status: http.StatusNotFound, Message: "No such item found"})
	} else {
		c.c.JSON(http.StatusOK, GetOneItemResponseObject{Status: http.StatusOK, Data: item})
	}
}

func (c *HTTPContext) AddItem() {
	var newItem struct {
		Name        string `json:"name" binding:"required"`
		Description string `json:"description"`
		Quantity    int    `json:"quantity"`
		Purchased   bool   `json:"purchased"`
	}

	if c.c.Bind(&newItem) == nil {

		createdItem, error := c.db.CreateNewItem(Item{
			Name:        newItem.Name,
			Description: newItem.Description,
			Quantity:    newItem.Quantity,
			Purchased:   newItem.Purchased,
		})

		if error != nil {
			c.c.JSON(http.StatusUnprocessableEntity, ErrorResponseObject{Status: http.StatusUnprocessableEntity, Message: "No such item found"})
		} else {
			c.c.JSON(http.StatusCreated, AddItemResponseObject{Status: http.StatusCreated, Data: createdItem})
		}
	}

}

func (c *HTTPContext) DeleteItem() {
	id, _ := strconv.Atoi(c.c.Params.ByName("id"))
	_, error := c.db.DeleteItemById(id)

	if error != nil {
		c.c.JSON(http.StatusAccepted, DeleteItemResponseObject{Status: http.StatusAccepted, Message: "Resource deleted successfully."})
	} else {
		c.c.JSON(http.StatusNotFound, ErrorResponseObject{Status: http.StatusNotFound, Message: "No such item found"})
	}
}

func (c *HTTPContext) UpdateItem() {
	id, _ := strconv.Atoi(c.c.Params.ByName("id"))
	updatedItem, error := c.db.FindOneItemById(id)

	if error != nil {
		c.c.JSON(http.StatusNotFound, ErrorResponseObject{Status: http.StatusNotFound, Message: "No such item found"})
	} else {
		c.c.JSON(http.StatusOK, UpdateItemResponseObject{Status: http.StatusOK, Data: updatedItem})
	}
}
