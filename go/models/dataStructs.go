package models

var (
	CsharpURL = "http://10.11.65.65:8080/receive_json"
	JavaURL   = "http://10.11.65.65:8080/receive_json"
	PythonURL = "http://10.2.130.190:8090/run-tests"
)

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
	Description string `json:"description"`
	EName       string `json:"ename"`
	StartDate   string `json:"start_date"`
}
type TaskToSubmit struct {
	Language string `json:"language"`
	Code     string `json:"code"`
}
type Result struct {
	TName  string `json:"tname"`
	Points int    `json:"points"`
	Time   int    `json:"time"`
	EName  string `json:"ename"`
}
