package controllers

import (
	"michaelpanik/veritone-shopping-list-api/responses"
	"net/http"

	"github.com/gin-gonic/gin"
)

func HealthCheck() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.JSON(http.StatusOK, responses.HealthResponse{Status: http.StatusOK, Message: "ShoppingList is okay!"})
	}
}
