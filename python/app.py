import os
import subprocess
from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route('/run-tests', methods=['POST'])
def run_tests():
    # Receive the code from the POST request
    code = request.get_data(as_text=True)

    # Set the path for the temporary file in the project folder
    temp_filename = 'temp_code.py'
    temp_filepath = os.path.join(app.root_path, temp_filename)

    # Write the code to the temporary file
    with open(temp_filepath, 'w') as temp_file:
        temp_file.write(code)

    # Run the unit tests on the code
    try:
        result = subprocess.check_output(['python', 'task1_example.py'], cwd=app.root_path, stderr=subprocess.STDOUT)
        result = result.decode('utf-8')
        passed = True
    except subprocess.CalledProcessError as e:
        result = e.output.decode('utf-8')
        passed = False

    # Remove the temporary file
    os.remove(temp_filepath)

    # Count the number of tests run and failed
    num_tests_run = result.count("failed test case")
    num_tests_passed = num_tests_run if passed else 0
    num_tests_failed = num_tests_run - num_tests_passed

    # Return the result
    return jsonify({
        'num_tests_run': num_tests_run,
        'num_tests_passed': num_tests_passed,
        'num_tests_failed': num_tests_failed,
        'result': result
    })


if __name__ == '__main__':
    app.run()
