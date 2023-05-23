package db

import (
	"Visma/helpers"
	"cloud.google.com/go/firestore"
	"context"
	"fmt"
	"google.golang.org/api/iterator"
	"google.golang.org/api/option"
	"log"
	"strconv"
)

var (
	ctx       = context.Background()
	projectID = "codefights-5b44a"
	keyPath   = "db/authentification.json"
)

type TeamJson struct {
	TeamName   string   `json:"teamname"`
	Members    []string `json:"members"`
	Emails     []string `json:"emails"`
	LanguageID int      `json:"languageID"`
	Ai         bool     `json:"ai"`
}

func AddUser(name string, email string, role string) {
	client, err := firestore.NewClient(ctx, projectID, option.WithCredentialsFile(keyPath))
	if err != nil {
		log.Fatalf("Failed to create Firestore client: %v", err)
	}

	userRef := client.Collection("Users").Doc(GetID("Users"))

	password := helpers.GeneratePassword()
	_, err = userRef.Set(ctx, map[string]interface{}{
		"username": name,
		"password": password,
		"email":    email,
		"role":     role,
	})
	if err != nil {
		log.Fatalf("Failed to add document: %v", err)
	}

	helpers.SendEmail(email, password, name)

	client.Close()
}
func AddTeam(teamJson TeamJson) {
	client, err := firestore.NewClient(ctx, projectID, option.WithCredentialsFile(keyPath))
	//pridame usera s ID ktorym  chceme my
	_, err = client.Collection("teams").Doc(GetID("teams")).Set(ctx, map[string]interface{}{
		"teamname": teamJson.TeamName,
		"emails":   teamJson.Emails,
		"language": teamJson.LanguageID,
		"ai":       teamJson.Ai,
	})
	if err != nil {
		log.Fatalf("Failed to add document: %v", err)
	}
	client.Close()

}
func CheckCredentials(username string, password string) bool {
	var goodCredentials bool
	client, err := firestore.NewClient(ctx, projectID, option.WithCredentialsFile(keyPath))
	if err != nil {
		// Handle error
	}
	defer client.Close()

	query := client.Collection("Users").Where("username", "==", username).Where("password", "==", password)
	iter := query.Documents(ctx)

	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			// Handle error
		}
		// Do something with the document data
		data := doc.Data()

		if data["username"] == username && data["password"] == password {
			goodCredentials = true

		} else {
			goodCredentials = false

		}

	}

	return goodCredentials

}
func GetID(path string) string {
	var id = 0

	client, err := firestore.NewClient(ctx, projectID, option.WithCredentialsFile(keyPath))
	if err != nil {
		// Handle error
	}
	defer client.Close()
	query := client.Collection(path)
	iter := query.Documents(ctx)

	for {
		_, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			// Handle error.
		}
		id++
	}
	str := strconv.Itoa(id + 1)

	return str

}
func WriteTeamInDB(teamJson TeamJson) {
	AddTeam(teamJson)
}
func WriteUsersInDB(teamJson TeamJson) {

	var username string
	var emails = []string{}
	var email string
	emails = helpers.ParseRegisterDataForEmail(helpers.TeamJson(teamJson))
	for i := 0; i < len(emails); i++ {
		email = emails[i]

		for _, char := range email {
			if char == '@' || char == '.' {
				break
			}
			username += string(char)

		}

		AddUser(username, emails[i], "user")
		username = ""
	}

}
func WriteProblemInDB(language string, task string) {

	client, err := firestore.NewClient(ctx, projectID, option.WithCredentialsFile(keyPath))

	_, err = client.Collection("tasks").Doc(GetID("tasks")).Set(ctx, map[string]interface{}{
		"language": language,
		"task":     task,
	})
	if err != nil {
		log.Fatalf("Failed to add document: %v", err)
	}
	client.Close()
}
func CheckSimilarNameExists(ctx context.Context, name string) bool {
	client, err := firestore.NewClient(ctx, projectID, option.WithCredentialsFile(keyPath))
	if err != nil {
		fmt.Println("db couldnt find project")
		return false
	}
	query := client.Collection("users").Where("name", "==", name)
	iter := query.Documents(ctx)
	defer iter.Stop()

	for {
		doc, err := iter.Next()
		fmt.Println(doc)
		if err == iterator.Done {
			// No matching documents found
			return false
		}
		if err != nil {
			// Handle error
			return false
		}

		// Document with similar name exists
		return true
	}
}
