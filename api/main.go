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

	item := ServerInterfaceImpl()

	router.GET("/item", item.GetAllItems)
	router.GET("/item/:id", item.GetOneItem)
	router.POST("/item", item.AddItem)
	router.PUT("/item/:id", item.UpdateItem)
	router.DELETE("/item/:id", item.DeleteItem)

	router.Run()
}
