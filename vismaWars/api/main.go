package main

import (
	"Visma/api/handlers"
	"Visma/helpers"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.POST("/register-team", handlers.RegistrationHandler)
	router.POST("/login", handlers.LoginHandler)
	router.POST("/logout", handlers.LogoutHandler)
	router.POST("/submit-task", handlers.SubmitTaskHandler)                  // submits code to languages by choice
	router.POST("/submit-new-challenge", handlers.SubmitNewChallengeHandler) //submits new challenges
	router.GET("/get-all-tasks", handlers.GetTasksHandler)                   //it gives me all tasks that are currently in database
	router.GET("/get-language-tasks", handlers.GetLanguageTaskHandler)       //it gives me all tasks that are currently in database
	router.PUT("/update-task/:id", handlers.EditTaskHandler)                 // it updates (edits task)
	router.POST("/add-task", handlers.AddTaskHandler)                        // adds task
	router.DELETE("/remove-task/:id", handlers.RemoveTaskByIDHandler)        //remove task
	//start competition
	//create competition
	//get leaderboard

	router.Use(handlers.CorsMiddleware())
	err := router.Run("" + helpers.IpAddress() + ":9090")
	if err != nil {
		return
	}
}
