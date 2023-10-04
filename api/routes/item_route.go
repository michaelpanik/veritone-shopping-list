package routes

import (
	"michaelpanik/veritone-shopping-list-api/controllers"

	"github.com/gin-gonic/gin"
)

func ItemRoute(router *gin.Engine) {
	router.GET("/item", controllers.GetManyItems())
	router.GET("/item/:id", controllers.GetOneItem())
	router.POST("/item", controllers.CreateItem())
	router.PUT("/item/:id", controllers.UpdateItem())
	router.DELETE("/item/:id", controllers.DeleteItem())
}
