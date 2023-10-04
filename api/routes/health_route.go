package routes

import (
	"michaelpanik/veritone-shopping-list-api/controllers"

	"github.com/gin-gonic/gin"
)

func HealthRoute(router *gin.Engine) {
	router.GET("/health-check", controllers.HealthCheck())
}
