package models

import (
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
