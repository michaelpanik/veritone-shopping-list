package responses

type HealthResponse struct {
	Status  int    `json:"status"`
	Message string `json:"message"`
}
