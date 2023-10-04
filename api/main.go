package main

import (
	"michaelpanik/veritone-shopping-list-api/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:8000"}

	router.Use(cors.New(config))

	routes.HealthRoute(router)

	router.Run()
}
