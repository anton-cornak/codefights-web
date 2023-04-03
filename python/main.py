import pyrebase
import uvicorn
import firebase_admin
import os

from firebase_admin import credentials, firestore
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google.cloud import firestore

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = "codefights-5b44a-firebase-adminsdk-r1rzy-cac7cb46a3.json"

firebaseConfig = {
    "apiKey": "AIzaSyA6tE3LWVPKM-8X0PSNtoSHT4RQzIpFfDI",
    "authDomain": "codefights-5b44a.firebaseapp.com",
    "databaseURL": "https://codefights-5b44a-default-rtdb.europe-west1.firebasedatabase.app",
    "projectId": "codefights-5b44a",
    "storageBucket": "codefights-5b44a.appspot.com",
    "messagingSenderId": "421836848263",
    "appId": "1:421836848263:web:d99778f320cc6720258c22",
    "measurementId": "G-P4XF25QVP5"
}

cred = credentials.Certificate('codefights-5b44a-firebase-adminsdk-r1rzy-cac7cb46a3.json')
firebase = firebase_admin.initialize_app(cred)
pb = pyrebase.initialize_app(firebaseConfig)
db = firestore.Client()
app = FastAPI()
allow_all = ['*']
app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_all,
    allow_credentials=True,
    allow_methods=allow_all,
    allow_headers=allow_all
)


class Submission(BaseModel):
    code: str

@app.post("/SubmitProblem/{problem_id}")
async def submit_problem(problem_id: str, submission: Submission):
    doc_ref = db.collection('problems').document(problem_id)
    doc = doc_ref.get()
    if not doc.exists:
        return {'error': 'Problem not found'}

    if submission.code == doc.to_dict()['solution']:
        status = 'success'
        result = 'Good job!'
    else:
        status = 'failure'
        result = 'Try it again. Something is wrong.'

    doc_ref = db.collection('submissions').document()
    doc_ref.set({
        'problem_id': problem_id,
        'code': submission.code,
        'status': status,
        'result': result
    })

    return {'id': doc_ref.id}

@app.get("/GetResultForProblem/{submission_id}")
async def get_result(submission_id: str):
    doc_ref = db.collection('submissions').document(submission_id)
    doc = doc_ref.get()
    if not doc.exists:
        return {'error': 'Submission not found'}

    submission_data = doc.to_dict()
    result = submission_data['result']

    problem_id = submission_data['problem_id']
    problem_ref = db.collection('problems').document(problem_id)
    problem_doc = problem_ref.get()
    if not problem_doc.exists:
        return {'error': 'Problem not found'}

    problem_data = problem_doc.to_dict()
    unit_tests = problem_data.get('unit_tests', [])

    num_passed = 0
    for unit_test in unit_tests:
        test_input = unit_test.get('input', '')
        expected_output = unit_test.get('output', '')
        try:
            actual_output = eval(submission_data['code'] + '\n' + test_input)
            if actual_output == expected_output:
                num_passed += 1
        except Exception as e:
            pass

    return {'status': doc.to_dict()['status'], 'result': doc.to_dict()['result'], 'num_passed': num_passed, 'num_tests': len(unit_tests)}

@app.get("/ListAllProblems")
async def list_problems():
    problems_ref = db.collection('problems')
    problems_docs = problems_ref.stream()

    problems = []
    for doc in problems_docs:
        problem = doc.to_dict()
        problem['id'] = doc.id
        problems.append(problem)

    return problems

class Problem(BaseModel):
    title: str
    description: str
    solution: str

@app.post("/ProblemPython")
async def add_problem(problem: Problem):
    doc_ref = db.collection('problems').document()

    doc_ref.set({
        'title': problem.title,
        'description': problem.description,
        'id': doc_ref.id
    })

    return {"id": doc_ref.id}

if __name__ == "__main__":
    uvicorn.run("main:app")
