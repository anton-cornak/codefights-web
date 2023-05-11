python/
│
├── app/
│ ├── \_\_init\_\_.py
│ ├── routes/
│ │ ├── \_\_init\_\_.py
│ │ ├── task_route.py (Route handler for algorithm tasks)
│ │
│ ├── services/
│ │ ├── \_\_init\_\_.py
│ │ ├── tasks/
│ │ │ ├── \_\_init\_\_.py
│ │ │ ├── task1.py (Correct solution to the task1)
│ │ │ ├── task2.py (Correct solution to the task2)
│ │ │ ├── ...
│ │
│ ├── utils/
│ │ ├── \_\_init\_\_.py
│ │ ├── evaluate_service.py (Functions to handle code evaluation)
│
│ ├── tests/
│ │ ├── \_\_init\_\_.py
│ │ ├── test_task1.py (Unit tests for task1)
│ │ ├── test_task2.py (Unit tests for task2)
│ │ ├── ...
│
└── Dockerfile (Dockerfile for building the Python backend container)
└── requirements.txt (Python dependency management)
