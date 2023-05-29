package models

type TeamJson struct {
	TeamName   string   `json:"teamname"`
	Members    []string `json:"members"`
	Emails     []string `json:"emails"`
	LanguageID int      `json:"languageID"`
	Ai         bool     `json:"ai"`
}

type UpdatedTask struct {
	Language string `json:"language"`
	Task     string `json:"task"`
}
type Task struct {
	Language string `json:"language"`
	Task     string `json:"task"`
	Id       int    `json:"id"`
}
type UserJson struct {
	UserName string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Role     string `json:"role"`
}

type Competition struct {
	Description string `firestore:"description"`
	EName       string `firestore:"ename"`
}
type TaskToSubmit struct {
	Language string `json:"language"`
	Code     string `json:"code"`
}
