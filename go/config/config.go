package config

import (
	"Visma/api/handlers"
	"github.com/gin-gonic/gin"
)

func SetupRouter(router *gin.Engine) {

	router.Use(handlers.CorsMiddleware())

	// Routes accessible to USER/ADMIN
	userAdminGroup := router.Group("/")
	{
		userAdminGroup.POST("/register-team", handlers.RegistrationHandler)
		userAdminGroup.POST("/login", handlers.LoginHandler)
		userAdminGroup.POST("/logout", handlers.LogoutHandler)
		userAdminGroup.POST("/submit-task", handlers.SubmitTaskHandler)
		userAdminGroup.GET("/get-all-tasks", handlers.GetTasksHandler)
		userAdminGroup.GET("/get-language-tasks", handlers.GetLanguageTaskHandler)
		userAdminGroup.GET("/get-results", handlers.GetResultsHandler)
	}

	// Routes accessible to ADMIN
	adminGroup := router.Group("/")
	{
		adminGroup.PUT("/update-task/:id", handlers.EditTaskHandler)
		adminGroup.POST("/add-task", handlers.AddTaskHandler)
		adminGroup.DELETE("/remove-task/:id", handlers.RemoveTaskByIDHandler)
		adminGroup.POST("/create-event", handlers.AddCompetitionHandler)
		adminGroup.POST("/start-competition/:id", handlers.StartCompetitionHandler)
		adminGroup.POST("/end-competition/:id", handlers.EndCompetitionHandler)
		adminGroup.PUT("/event-results", handlers.EventResultHandler)
	}

	err := router.SetTrustedProxies([]string{"127.0.0.1"})
	if err != nil {
		return
	}
}
