package handlers

import (
	"Visma/api/services"
	"Visma/db"
	"Visma/helpers"
	userJson "Visma/helpers"
	"fmt"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"strings"
)

var (
	tokenMap = map[userJson.UserJson]string{}
)

type TeamJson struct {
	TeamName   string   `json:"teamname"`
	Members    []string `json:"members"`
	Emails     []string `json:"emails"`
	LanguageID int      `json:"languageID"`
	Ai         bool     `json:"ai"`
}

func LoginHandler(context *gin.Context) {
	fmt.Println(tokenMap)

	var user userJson.UserJson
	if err := context.ShouldBindJSON(&user); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	value := tokenMap[user]
	fmt.Println(user.UserName, user.Password)
	fmt.Println(db.CheckCredentials(user.UserName, user.Password))

	if len(value) == 0 {

		if db.CheckCredentials(user.UserName, user.Password) {

			HeaderToken := helpers.GenerateToken()
			user.Role = db.GetUserRoleByUsername(user.UserName, user.Password)
			tokenMap[user] = HeaderToken
			context.JSON(http.StatusOK, gin.H{"Token": HeaderToken})
			fmt.Println(user.UserName)
			fmt.Println(tokenMap)

		} else {
			context.JSON(http.StatusUnauthorized, gin.H{"error": "bad credentials"})
		}
	} else {

		context.JSON(http.StatusUnauthorized, 401)
	}

}

func LogoutHandler(context *gin.Context) {
	var HeaderToken = context.GetHeader("token")

	if helpers.ContainsValue(tokenMap, HeaderToken) {

		delete(tokenMap, helpers.FindKeyByValue(tokenMap, HeaderToken))

		context.JSON(http.StatusOK, 200)

	} else {
		context.JSON(http.StatusUnauthorized, 401)
	}
	fmt.Println(tokenMap)

}
func RegistrationHandler(context *gin.Context) {
	var body = context.Request.Body

	fmt.Println(body)
	var teamJson TeamJson
	if err := context.ShouldBindJSON(&teamJson); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if strings.TrimSpace(teamJson.TeamName) == "" || len(teamJson.Emails) == 0 || (teamJson.LanguageID < 1 || teamJson.LanguageID > 4) {
		return
	}

	db.WriteUsersInDB(db.TeamJson(teamJson))
	db.WriteTeamInDB(db.TeamJson(teamJson))

	/*
		1.parse json with email !done
		2.generate password for email !done
		3.write in database password and email in USER !done
		4.write in team database  !done
		5.send email with LoginHandler !done
		6.if everything pass send statusOK
	*/
}
func SubmitTaskHandler(context *gin.Context) {
	var body = context.Request.Body
	var code services.Task

	var team = context.GetHeader("teamname")
	fmt.Println(team)
	fmt.Println(code)
	fmt.Println(body)
	if err := context.ShouldBindJSON(&code); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	switch code.Language {
	case "python":
		services.SendCodeToPython(code, context)
	case "csharp":
		services.SendCodeToCSharp(code, context)
	case "java":
		services.SendCodeToJava(code, context)
	default:
		context.JSON(http.StatusBadRequest, gin.H{"error": "not supported language"})
	}
	/*
		cases for other languages:
		case "golang":
				sendCodeToGolang(code, context)
			case "javascript":
				sendCodeToJavascript(code, context)
			case "typescript":
				sendCodeToTypescript(code, context)
	*/

}
func SubmitNewChallengeHandler(context *gin.Context) {
	token := context.GetHeader("token")
	var user userJson.UserJson
	user = helpers.GetKeyByValue(tokenMap, token)

	if len(user.Role) == 0 {
		context.JSON(http.StatusUnauthorized, gin.H{"error": "no role assigned"})
		return
	}

	if user.Role != "admin" {
		context.JSON(http.StatusUnauthorized, gin.H{"error": "user cant add task"})
		return
	}
	var task services.Task
	fmt.Println(task)

	if err := context.ShouldBindJSON(&task); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	} else {
		db.WriteProblemInDB(task.Language, task.Code)
		context.JSON(http.StatusCreated, gin.H{"task": "created successfully"})

	}
}
func GetTasksHandler(context *gin.Context) {

	tasks, err := db.GetTasksFromFirestore()
	if err != nil {
		log.Printf("Failed to get tasks: %v", err)
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		return
	}

	context.JSON(http.StatusOK, tasks)
}
func GetLanguageTaskHandler(context *gin.Context) {
	language := context.GetHeader("language")
	tasks, err := db.GetTasksFromFirestoreInLanguageThatIsChosen(language)
	if err != nil {
		log.Printf("Failed to get tasks: %v", err)
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		return
	}

	context.JSON(http.StatusOK, tasks)
}
func EditTaskHandler(context *gin.Context) {

	token := context.GetHeader("token")
	var user userJson.UserJson
	user = helpers.GetKeyByValue(tokenMap, token)
	if len(user.Role) == 0 {
		context.JSON(http.StatusUnauthorized, gin.H{"error": "no role assigned"})
		return
	}
	if user.Role != "admin" {
		context.JSON(http.StatusUnauthorized, gin.H{"error": "user cant edit task"})
		return
	}

	// Get the task ID from the URL path
	taskID := context.Param("id")

	// Parse the updated task information from the request body
	var updatedTask db.UpdatedTask
	if err := context.ShouldBindJSON(&updatedTask); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	// Call the function to update the task in Firestore
	err := db.UpdateTaskInFirestore(taskID, updatedTask)
	if err != nil {
		log.Printf("Failed to update task: %v", err)
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Task updated successfully"})
}
func AddTaskHandler(context *gin.Context) {
	token := context.GetHeader("token")
	var user userJson.UserJson
	user = helpers.GetKeyByValue(tokenMap, token)
	if len(user.Role) == 0 {
		context.JSON(http.StatusUnauthorized, gin.H{"error": "no role assigned"})
		return
	}
	if user.Role != "admin" {
		context.JSON(http.StatusUnauthorized, gin.H{"error": "user cant add task"})
		return
	}

	var task db.Task
	if err := context.ShouldBindJSON(&task); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	err := db.AddTaskToFirestore(task)
	if err != nil {
		log.Printf("Failed to add task: %v", err)
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Task added successfully"})
}
func RemoveTaskByIDHandler(context *gin.Context) {
	token := context.GetHeader("token")
	var user userJson.UserJson
	user = helpers.GetKeyByValue(tokenMap, token)
	if len(user.Role) == 0 {
		context.JSON(http.StatusUnauthorized, gin.H{"error": "no role assigned"})
		return
	}
	if user.Role != "admin" {
		context.JSON(http.StatusUnauthorized, gin.H{"error": "user cant remove task"})
		return
	}
	// Get the task ID from the path parameter
	taskID := context.Param("id")

	// Check if the request contains a valid authentication token

	// Call the function to remove the task from Firestore
	err := db.RemoveTaskFromFirestore(taskID)
	if err != nil {
		log.Printf("Failed to remove task: %v", err)
		context.JSON(http.StatusBadRequest, gin.H{"error": "task doesnt exist"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Task removed successfully"})
}
