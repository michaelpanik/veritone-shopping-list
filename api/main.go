package main

import (
	"log"
	"michaelpanik/veritone-shopping-list-api/db"
	"michaelpanik/veritone-shopping-list-api/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:8000"}

	router.Use(cors.New(config))

	db := db.NewDBContext()
	item := routes.NewItemServer(db)

	router.GET("/item", item.GetAllItems)
	router.GET("/item/:id", item.GetOneItem)
	router.POST("/item", item.AddItem)
	router.PUT("/item/:id", item.UpdateItem)
	router.DELETE("/item/:id", item.DeleteItem)

	if err := router.Run(); err != nil {
		log.Fatal(err)
	}
}
