package handlers

import (
	"Visma/api/services"
	"Visma/db"
	"Visma/helpers"
	userJson "Visma/helpers"
	"fmt"
	"github.com/gin-gonic/gin"
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

func Login(context *gin.Context) {
	fmt.Println(tokenMap)

	var userJson userJson.UserJson
	if err := context.ShouldBindJSON(&userJson); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	value := tokenMap[userJson]
	fmt.Println(userJson.UserName, userJson.Password)
	fmt.Println(db.CheckCredentials(userJson.UserName, userJson.Password))

	if len(value) == 0 {

		if db.CheckCredentials(userJson.UserName, userJson.Password) {

			HeaderToken := helpers.GenerateToken()
			tokenMap[userJson] = HeaderToken
			context.JSON(http.StatusOK, gin.H{"Token": HeaderToken})

		} else {
			context.JSON(http.StatusUnauthorized, gin.H{"error": "bad credentials"})
		}
	} else {

		context.JSON(http.StatusUnauthorized, 401)
	}

}

// TODO make this method only take token for logout
func Logout(context *gin.Context) {
	var HeaderToken = context.GetHeader("token")

	if helpers.ContainsValue(tokenMap, HeaderToken) {

		delete(tokenMap, helpers.FindKeyByValue(tokenMap, HeaderToken))

		context.JSON(http.StatusOK, 200)

	} else {
		context.JSON(http.StatusUnauthorized, 401)
	}
	fmt.Println(tokenMap)

}
func Registration(context *gin.Context) {
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
		5.send email with Login !done
		6.if everything pass send statusOK
	*/
}
func SubmitTask(context *gin.Context) {
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
func SubmitNewChallenge(context *gin.Context) {

	var role = context.GetHeader("role")
	if len(role) == 0 {
		return
	}
	if role != "admin" {
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
		context.JSON(http.StatusCreated, gin.H{"task": "created sucessfully"})

	}
}
