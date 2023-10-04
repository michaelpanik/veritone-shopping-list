package controllers

import (
	"fmt"
	"michaelpanik/veritone-shopping-list-api/responses"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetManyItems() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.JSON(http.StatusOK, responses.ItemResponse{Status: http.StatusOK})
	}
}

func GetOneItem() gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")
		c.JSON(http.StatusOK, responses.ItemResponse{Status: http.StatusOK, Message: fmt.Sprintf("Id: %i", id)})
	}

}

func CreateItem() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.JSON(http.StatusOK, responses.ItemResponse{Status: http.StatusOK})
	}

}

func UpdateItem() gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")
		c.JSON(http.StatusOK, responses.ItemResponse{Status: http.StatusOK, Message: fmt.Sprintf("Id: %i", id)})
	}

}

func DeleteItem() gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")
		c.JSON(http.StatusOK, responses.ItemResponse{Status: http.StatusOK, Message: fmt.Sprintf("Id: %i", id)})
	}

}
