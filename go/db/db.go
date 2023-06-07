package db

import (
	"Visma/helpers"
	"Visma/models"
	"cloud.google.com/go/firestore"
	"context"
	"errors"
	"fmt"
	"google.golang.org/api/iterator"
	"google.golang.org/api/option"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"log"
	"strconv"
	"time"
)

var (
	ctx       = context.Background()
	projectID = "codefights-5b44a"
	keyPath   = "db/authentification.json"
)

func AddUser(name string, email string, role string) {
	client, err := firestore.NewClient(ctx, projectID, option.WithCredentialsFile(keyPath))
	if err != nil {
		log.Fatalf("Failed to create Firestore client: %v", err)
	}

	userRef := client.Collection("Users").Doc(GetIdInDB("Users"))

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

	err = client.Close()
	if err != nil {
		return
	}
}
func AddTeam(teamJson models.TeamJson) {
	client, err := firestore.NewClient(ctx, projectID, option.WithCredentialsFile(keyPath))
	//pridame usera s ID ktorym  chceme my
	_, err = client.Collection("teams").Doc(GetIdInDB("teams")).Set(ctx, map[string]interface{}{
		"teamname": teamJson.TeamName,
		"emails":   teamJson.Emails,
		"language": teamJson.LanguageID,
		"ai":       teamJson.Ai,
	})
	if err != nil {
		log.Fatalf("Failed to add document: %v", err)
	}
	err = client.Close()
	if err != nil {
		return
	}

}
func CheckCredentials(username string, password string) bool {
	var goodCredentials bool
	client, err := firestore.NewClient(ctx, projectID, option.WithCredentialsFile(keyPath))
	if err != nil {
		// Handle error
	}
	defer func(client *firestore.Client) {
		err := client.Close()
		if err != nil {

		}
	}(client)

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
func GetIdInDB(path string) string {
	var highestID int

	client, err := firestore.NewClient(ctx, projectID, option.WithCredentialsFile(keyPath))
	if err != nil {
		return ""
	}
	defer func(client *firestore.Client) {
		err := client.Close()
		if err != nil {

		}
	}(client)

	query := client.Collection(path)
	iter := query.Documents(ctx)

	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return ""
		}

		// Parse the document ID as an integer
		id, err := strconv.Atoi(doc.Ref.ID)
		if err != nil {
			return ""
		}

		if id > highestID {
			highestID = id
		}
	}

	highestID++ // Increment the highest ID by one
	str := strconv.Itoa(highestID)
	return str
}

func WriteTeamInDB(teamJson models.TeamJson) {
	AddTeam(teamJson)
}
func WriteUsersInDB(teamJson models.TeamJson) {

	var username string
	var emails []string
	var email string
	emails = helpers.ParseRegisterDataForEmail(teamJson)
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
func GetUserRoleByUsername(username string, password string) string {
	// Initialize the Firestore client
	client, err := firestore.NewClient(ctx, projectID, option.WithCredentialsFile(keyPath))
	if err != nil {
		return ""
	}
	defer func(client *firestore.Client) {
		err := client.Close()
		if err != nil {

		}
	}(client)

	// Replace "users" with the name of your Firestore collection that stores user data
	query := client.Collection("Users").Where("username", "==", username).Where("password", "==", password)

	docs, err := query.Documents(context.Background()).GetAll()
	if err != nil {
		log.Printf("Failed to query user documents: %v", err)
		return ""
	}

	if len(docs) == 0 {
		log.Println("User not found")
		return ""
	}

	doc := docs[0]

	// Replace "role" with the field name that stores the user's role in your Firestore document
	role, err := doc.DataAt("role")
	if err != nil {
		log.Printf("Failed to get user role: %v", err)
		return ""
	}

	if role == nil {
		log.Println("User role not found")
		return ""
	}

	// Convert the role to a string
	roleStr, ok := role.(string)
	if !ok {
		log.Println("User role is not a string")
		return ""
	}

	return roleStr
}
func GetTasksFromFirestore() ([]models.Task, error) {
	// Initialize the Firestore client
	client, err := firestore.NewClient(ctx, projectID, option.WithCredentialsFile(keyPath))
	if err != nil {
		return nil, err
	}
	defer func(client *firestore.Client) {
		err := client.Close()
		if err != nil {

		}
	}(client)

	// Replace "tasks" with the name of your Firestore collection that stores tasks
	collectionRef := client.Collection("tasks")

	docs, err := collectionRef.Documents(context.Background()).GetAll()
	if err != nil {
		return nil, err
	}

	var tasks []models.Task

	for _, doc := range docs {
		var task models.Task
		if err := doc.DataTo(&task); err != nil {
			log.Printf("Failed to parse task document: %v", err)
			continue
		}
		tasks = append(tasks, task)
	}

	return tasks, nil
}
func GetTasksFromFirestoreInLanguageThatIsChosen(language string) ([]models.Task, error) {
	// Initialize the Firestore client
	client, err := firestore.NewClient(ctx, projectID, option.WithCredentialsFile(keyPath))
	if err != nil {
		return nil, err
	}
	defer func(client *firestore.Client) {
		err := client.Close()
		if err != nil {

		}
	}(client)

	// Replace "tasks" with the name of your Firestore collection that stores tasks
	collectionRef := client.Collection("tasks").Where("language", "==", language)

	docs, err := collectionRef.Documents(context.Background()).GetAll()
	if err != nil {
		return nil, err
	}

	var tasks []models.Task

	for _, doc := range docs {
		var task models.Task
		if err := doc.DataTo(&task); err != nil {
			log.Printf("Failed to parse task document: %v", err)
			continue
		}
		tasks = append(tasks, task)
	}

	return tasks, nil
}
func UpdateTaskInFirestore(taskID string, updatedTask models.UpdatedTask) error {

	// Initialize the Firestore client
	client, err := firestore.NewClient(ctx, projectID, option.WithCredentialsFile(keyPath))
	if err != nil {
		return err
	}
	defer func(client *firestore.Client) {
		err := client.Close()
		if err != nil {

		}
	}(client)
	docRef := client.Collection("tasks").Doc(taskID)
	updateData := []firestore.Update{
		{
			Path:  "language",
			Value: updatedTask.Language,
		},
		{
			Path:  "task",
			Value: updatedTask.Task,
		},
	}

	// Update the task document with the specified fields
	_, err = docRef.Update(context.Background(), updateData)
	if err != nil {
		return err
	}

	return nil
}
func AddTaskToFirestore(task models.Task) error {
	client, err := firestore.NewClient(ctx, projectID, option.WithCredentialsFile(keyPath))
	if err != nil {
		log.Fatalf("Failed to create Firestore client: %v", err)
	}
	defer func(client *firestore.Client) {
		err := client.Close()
		if err != nil {

		}
	}(client)

	_, err = client.Collection("tasks").Doc(GetIdInDB("tasks")).Set(ctx, map[string]interface{}{
		"language": task.Language,
		"task":     task.Task,
	})
	if err != nil {
		return err
	}

	return nil
}
func RemoveTaskFromFirestore(taskID string) error {
	// Initialize the Firestore client
	client, err := firestore.NewClient(ctx, projectID, option.WithCredentialsFile(keyPath))
	if err != nil {
		return err
	}
	defer func(client *firestore.Client) {
		err := client.Close()
		if err != nil {

		}
	}(client)

	docRef := client.Collection("tasks").Doc(taskID)

	isIdExisting, err := DocumentWithIdExists(ctx, client, "tasks", taskID)

	if !isIdExisting {
		return errors.New("task by this id doesnt exists")
	}
	_, err = docRef.Delete(context.Background())
	if err != nil {
		return err
	}

	return nil
}
func DocumentWithIdExists(ctx context.Context, client *firestore.Client, collectionName, documentID string) (bool, error) {
	docRef := client.Collection(collectionName).Doc(documentID)
	docSnap, err := docRef.Get(ctx)

	if err != nil {

		if statusOfDocument, ok := status.FromError(err); ok && statusOfDocument.Code() == codes.NotFound {

			return false, nil
		}

		return false, err
	}

	if docSnap.Exists() {

		return true, nil
	}

	return false, nil
}

func AddCompetition(competition models.Competition) error {

	client, err := firestore.NewClient(ctx, projectID, option.WithCredentialsFile(keyPath))
	_, err = client.Collection("competition").Doc(GetIdInDB("competition")).Set(ctx, map[string]interface{}{
		"description": competition.Description,
		"ename":       competition.EName,
		"start_date":  competition.StartDate,
	})
	if err != nil {
		log.Fatalf("Failed to add document: %v", err)
	}
	err = client.Close()
	if err != nil {
		return err
	}
	return err

}
func StartTimeInDatabase(id string) error {
	hasStarted, err := HasStartOrEndedDate(id, "start")
	if hasStarted {
		return errors.New("its already ongoing")
	}
	// Create a Firestore client
	ctx := context.Background()
	client, err := firestore.NewClient(ctx, projectID, option.WithCredentialsFile(keyPath))
	if err != nil {
		return fmt.Errorf("failed to create Firestore client: %v", err)
	}
	defer func(client *firestore.Client) {
		err := client.Close()
		if err != nil {

		}
	}(client)

	// Get the reference to the competition document by name
	docRef := client.Collection("competition").Doc(id)

	// Update the start time field with the new value
	_, err = docRef.Update(ctx, []firestore.Update{
		{
			Path:  "start",
			Value: time.Now(),
		},
	})
	if err != nil {
		return fmt.Errorf("failed to update competition start time: %v", err)
	}

	return nil
}
func EndTimeInDatabase(id string) error {
	hasEnded, err := HasStartOrEndedDate(id, "end")
	if hasEnded {
		return errors.New("already done")
	}
	ctx := context.Background()
	client, err := firestore.NewClient(ctx, projectID, option.WithCredentialsFile(keyPath))
	if err != nil {
		return fmt.Errorf("failed to create Firestore client: %v", err)
	}
	defer func(client *firestore.Client) {
		err := client.Close()
		if err != nil {

		}
	}(client)

	docRef := client.Collection("competition").Doc(id)

	_, err = docRef.Update(ctx, []firestore.Update{
		{
			Path:  "end",
			Value: time.Now(),
		},
	})
	if err != nil {
		return fmt.Errorf("failed to update competition end time: %v", err)
	}

	return nil
}
func HasStartOrEndedDate(id string, startOrEnd string) (bool, error) {
	ctx := context.Background()
	client, err := firestore.NewClient(ctx, projectID, option.WithCredentialsFile(keyPath))
	if err != nil {
		return false, fmt.Errorf("failed to create Firestore client: %v", err)
	}
	defer func(client *firestore.Client) {
		err := client.Close()
		if err != nil {

		}
	}(client)

	docRef := client.Collection("competition").Doc(id)

	docSnap, err := docRef.Get(ctx)
	if err != nil {
		return false, fmt.Errorf("failed to get competition document: %v", err)
	}

	data := docSnap.Data()
	startDate, exists := data[startOrEnd]
	if !exists || startDate == nil {
		return false, nil
	}

	return true, nil
}
func WriteResultInDB(result models.Result) error {

	client, err := firestore.NewClient(ctx, projectID, option.WithCredentialsFile(keyPath))
	//pridame usera s ID ktorym  chceme my
	_, err = client.Collection("results").Doc(GetIdInDB("results")).Set(ctx, map[string]interface{}{
		"tname":  result.TName,
		"points": result.Points,
		"time":   result.Time,
		"ename":  result.EName,
	})
	if err != nil {
		log.Fatalf("Failed to add document: %v", err)
	}
	err = client.Close()
	if err != nil {
		return err
	}
	return err
}
func GetAllResults() ([]models.Result, error) {
	// Set up Firestore client

	client, err := firestore.NewClient(ctx, projectID, option.WithCredentialsFile(keyPath))
	if err != nil {
		return nil, err
	}
	defer func(client *firestore.Client) {
		err := client.Close()
		if err != nil {

		}
	}(client)

	// Retrieve all documents from "results" collection
	iter := client.Collection("results").Documents(ctx)
	defer iter.Stop()

	var results []models.Result
	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return nil, err
		}

		var result models.Result
		if err := doc.DataTo(&result); err != nil {
			return nil, err
		}

		results = append(results, result)
	}

	return results, nil
}
