
Changes
-
I used FastApi and linked it to Firebase, where I primarily use Firestore.

I created four endpoints.

1. /ProblemPython - which creates the problem or challenge and generates the problem ID


2. /ListAllProblems - which is a list of all problems and challenges and returns json


3. /SubmitProblem/problem_id - which is submit, which takes problem_id and user input and compares user code with expected code and returns if it succeeded or failed.


4. /GetResultForProblem/submission_id> - which is the return result of the submission