package main

import (
	"Visma/config"
	"Visma/helpers"
	"github.com/gin-gonic/gin"
)

func main() {
	gin.SetMode(gin.ReleaseMode)
	router := gin.New()
	config.SetupRouter(router)
	err := router.Run("" + helpers.IpAddress() + ":9090")
	if err != nil {
		return
	}
}
