# Code Fights
Let the Code Fights begin! The first team to solve 5 algorithms will gain eternal glory! But first, we need to create the platform that will make all of this possible...

## General requirements
- Participants should be able to register for event.
- Participants should be able to login to the event when it starts.
- Participants should have problem description and a way to submit their solution.
- The solution should be evaluated using multiple unit tests written specifically for the desired programming language and the algorithm.
- Visma should have access to a lot of metrics, such as completion time, data about participants etc - this will be used for a corporate-wide research about the usage of AI technologies in software development.
**- The solution should run in any environment flawlessly - locally and on cloud as well**

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
    "ai" field is boolean whether a team used copilot/chatbots to solve problems.
- **login** - /login - when the event starts, teams should be able to login.
- **algorithms** - /{problemID} - problem description, area to put the code in, a button to send the solution to backend.
- **leaderboard** - /leaderboard - real-time data, who is the winner so far? Data should be stored in SQL database.

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
	
Obviously, this data needs to be sent to the backend from the front-end part of the platform... :) 
- Endpoint should return the following json structure:
	```
	{
		"correct": false,
		"performance": 0,
		"messages": ["failed unit tests"]
	}
	```
	Feel free to calculate performance as you think would be fair in a competition such as Code Fights. 
- Endpoint should store data to the database, such as number of retries, score, etc

# Data engineering
- All the data should be stored in a database. 
- Spend some hours trying to design the database that should be used for this project.

## Requirements
- We need to store data about teams, such as team members, email addresses, potentiallty their skill level, current occupation within Visma company, basically sky is the limit (and GDPR of course as well).
- We need to have real-time information about the competition to be used as leaderboard: this should contain information about submitted solutions, performance score etc.
- You can think about storing problem descriptions/correct solutions/set of unit tests in the database as well - this will add another layer of abstraction, so that the platform will be much more reusable for future projects.

# DevOps
- The solution will be deployed on one of the 3 big cloud providers: AWS, GCP or Azure (but most likely GCP).
- If you'd like to go deeper, feel free to replace some of the functionality by existing Cloud services (good example might be switching database for serverless solution, such as Firestore/Firebase). 
- All services should run in Docker.

And remember: If you struggle, ask for help. 