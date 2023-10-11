package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:8000"}

	router.Use(cors.New(config))

	db := NewDBContext()
	router.GET("/item", db.GetAllItems)
	router.GET("/item/:id", db.GetOneItem)
	router.POST("/item", db.AddItem)
	router.PUT("/item/:id", db.UpdateItem)
	router.DELETE("/item/:id", db.DeleteItem)

	router.Run()
}
