package routes

import (
	"michaelpanik/veritone-shopping-list-api/db"
	"michaelpanik/veritone-shopping-list-api/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type ItemServer struct {
	db *db.DBContext
}

func NewItemServer(db *db.DBContext) *ItemServer {
	return &ItemServer{
		db: db,
	}
}

func (s *ItemServer) GetAllItems(c *gin.Context) {
	items, err := s.db.FindAllItems()

	if err != nil {
		c.JSON(http.StatusInternalServerError, models.ErrorResponseObject{Status: http.StatusInternalServerError, Message: err.Error()})
		return
	}

	c.JSON(http.StatusOK, models.GetAllItemsResponseObject{Status: http.StatusOK, Data: items})
}

func (s *ItemServer) GetOneItem(c *gin.Context) {
	id, err := strconv.Atoi(c.Params.ByName("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponseObject{Status: http.StatusBadRequest, Message: "Invalid ID"})
		return
	}

	item, err := s.db.FindOneItemById(id)

	if err != nil {
		c.JSON(http.StatusNotFound, models.ErrorResponseObject{Status: http.StatusNotFound, Message: "No such item found"})
		return
	}

	c.JSON(http.StatusOK, models.GetOneItemResponseObject{Status: http.StatusOK, Data: item})
}

func (s *ItemServer) AddItem(c *gin.Context) {
	var newItem models.Item

	if err := c.ShouldBindJSON(&newItem); err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponseObject{Status: http.StatusBadRequest, Message: "Invalid input"})
		return
	}

	createdItem, err := s.db.CreateNewItem(newItem)

	if err != nil {
		c.JSON(http.StatusUnprocessableEntity, models.ErrorResponseObject{Status: http.StatusUnprocessableEntity, Message: "Error creating item"})
		return
	}

	c.JSON(http.StatusCreated, models.AddItemResponseObject{Status: http.StatusCreated, Data: createdItem})
}

func (s *ItemServer) DeleteItem(c *gin.Context) {
	id, err := strconv.Atoi(c.Params.ByName("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponseObject{Status: http.StatusBadRequest, Message: "Invalid ID"})
		return
	}

	success, err := s.db.DeleteItemById(id)

	if err != nil {
		c.JSON(http.StatusNotFound, models.ErrorResponseObject{Status: http.StatusNotFound, Message: "No such item found"})
		return
	}

	if success {
		c.JSON(http.StatusAccepted, models.DeleteItemResponseObject{Status: http.StatusAccepted, Message: "Resource deleted successfully."})
	}
}

func (s *ItemServer) UpdateItem(c *gin.Context) {
	id, err := strconv.Atoi(c.Params.ByName("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponseObject{Status: http.StatusBadRequest, Message: "Invalid ID"})
		return
	}

	var newItem models.Item

	if err := c.ShouldBindJSON(&newItem); err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponseObject{Status: http.StatusBadRequest, Message: "Invalid input"})
		return
	}

	updatedItem, err := s.db.UpdateItemById(id, newItem)

	if err != nil {
		c.JSON(http.StatusNotFound, models.ErrorResponseObject{Status: http.StatusNotFound, Message: "No such item found"})
		return
	}

	c.JSON(http.StatusOK, models.UpdateItemResponseObject{Status: http.StatusOK, Data: updatedItem})
}
