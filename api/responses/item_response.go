package responses

import "michaelpanik/veritone-shopping-list-api/models"

type ItemResponse struct {
	Status  int           `json:"status"`
	Message string        `json:"message,omitempty"`
	Data    []models.Item `json:"data,omitempty"`
}
