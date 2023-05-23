package main

import (
	"Visma/api/handlers"
	"Visma/helpers"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.POST("/register-team", handlers.Registration)
	router.POST("/login", handlers.Login)
	router.POST("/logout", handlers.Logout)
	router.POST("/submit-task", handlers.SubmitTask)                 // submits code to languages by choice
	router.POST("submit-new-challenge", handlers.SubmitNewChallenge) //submits new challenges

	//get all tasks
	//edit task
	//add task
	//remove task
	//start competition
	//create competition
	//get leaderboard

	router.Use(handlers.CorsMiddleware())
	router.Run("" + helpers.IpAddress() + ":9090")
}
