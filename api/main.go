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
	http := NewHTTPContext(&gin.Context{}, db)

	router.GET("/item", http.GetAllItems)
	router.GET("/item/:id", http.GetOneItem)
	router.POST("/item", http.AddItem)
	router.PUT("/item/:id", http.UpdateItem)
	router.DELETE("/item/:id", http.DeleteItem)

	router.Run()
}
