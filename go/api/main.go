package main

import (
	"Visma/config"
	"Visma/helpers"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	config.SetupRouter(router)
	err := router.Run("" + helpers.IpAddress() + ":9090")
	if err != nil {
		return
	}
}
