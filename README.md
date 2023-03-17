# Code Fights
Let the Code Fights begin! The first team to solve 5 algorithms will gain eternal glory! But first, we need to create the application that will make this possible...

## General requirements
- Participants should be able to register for event.
- Participants should be able to login to the event when it starts.
- Participants should have problem description and a way to submit their solution.
- The solution should be evaluated using multiple unit tests written specifically for the desired programming language and the algorithm.
**- The solution should run in Docker**

# Front-end
## Techstack
- [Next.js](https://nextjs.org/)
- [yarn](https://yarnpkg.com/)
- [tailwindcss](https://tailwindcss.com/)

**Optional (design)**
- [Visma UX](https://ux.visma.com/)
- [Nordic Cool](https://www.npmjs.com/package/@vismaux/nordic-cool)

## Requirements
- **homepage** - / - be creative. :)
- **registration for events** - /register - simple form where participants can choose team name and programming language to compete in:
```
{
	"teamname": "",
	"members": [""],
	"emails": [""],
	"languageID": 0,
	"ai": false,
}
```
- **login** - /login - when the event starts, teams should be able to login.
- **algorithms** - /{problemID} - problem description, area to put the code in, a button to send the solution to backend.
- **leaderboard** - /leaderboard - real-time data, who is the winner so far? Data should be stored in SQL data.

# Backend [Python](https://www.python.org/) & [Golang](https://go.dev/)
## Techstack
- Python frameworks (pick one): [Flask](https://flask.palletsprojects.com/en/2.2.x/), [FastAPI](https://fastapi.tiangolo.com/), [Django](https://www.djangoproject.com/), or whatever you prefer (but please consult first :D)
- Go doesn't need frameworks ;) 
## Requirements
- Write a server script
- Each language should run in a separate docker file.
- **/api/v1/{problemID}**  - should contain correct solution to the problem and a set of unit tests (random test cases) to compare correct solution with the submitted solution. Return performance and correctness of the solution. [Example of the unit tests](https://github.com/anton-cornak/code-fights/blob/main/Python/challenge_1_tests.py).
- Endpoint should accept the following json structure:
	```
	{
		"teamID": 0,
		"languageID": 0,
		"code": ""
	}
	```
	
Obviously, this data needs to be sent to the backend from the front-end part... :) 
- Endpoint should return the following json structure:
	```
	{
		"correct": false,
		"performance": 0,
		"messages": ["failed unit tests"]
	}
	```
	
- Endpoint should store data to the database, such as number of retries, score, etc