package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Item struct {
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

type GinContext struct {
	c *gin.Context
}

func ServerInterfaceImpl(c *gin.Context) *GinContext {
	return &GinContext{
		c: c,
	}
}

func (c *GinContext) GetAllItems() {
	items, ok := []Item{}, true

	if ok {
		c.c.JSON(http.StatusOK, GetAllItemsResponseObject{Status: http.StatusOK, Data: items})
	} else {
		c.c.JSON(http.StatusNotFound, ErrorResponseObject{Status: http.StatusNotFound, Message: "No such item found"})
	}
}

func (c *GinContext) GetOneItem() {
	id := c.c.Params.ByName("id")
	item, ok := Item{}, true

	if ok {
		c.c.JSON(http.StatusOK, GetOneItemResponseObject{Status: http.StatusOK, Data: item})
	} else {
		c.c.JSON(http.StatusNotFound, ErrorResponseObject{Status: http.StatusNotFound, Message: "No such item found"})
	}
}

func (c *GinContext) AddItem() {
	newItem := Item{}

	c.c.JSON(http.StatusCreated, AddItemResponseObject{Status: http.StatusCreated, Data: newItem})
}

func (c *GinContext) DeleteItem() {
	id := c.c.Params.ByName("id")
	ok := true

	if ok {
		c.c.JSON(http.StatusAccepted, DeleteItemResponseObject{Status: http.StatusAccepted, Message: "Resource deleted successfully."})
	} else {
		c.c.JSON(http.StatusNotFound, ErrorResponseObject{Status: http.StatusNotFound, Message: "No such item found"})
	}
}

func (c *GinContext) UpdateItem() {
	id := c.c.Params.ByName("id")
	updatedItem, ok := Item{}, true

	if ok {
		c.c.JSON(http.StatusOK, UpdateItemResponseObject{Status: http.StatusOK, Data: updatedItem})
	} else {
		c.c.JSON(http.StatusNotFound, ErrorResponseObject{Status: http.StatusNotFound, Message: "No such item found"})
	}
}
