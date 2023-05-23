import logging
from flask import Flask, request
import subprocess
import base64
import requests
import json
import string

import task1_example

app = Flask(__name__)

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

@app.route('/receive_string', methods=['POST'])
def receive_string():
    logger.info('Received POST request to /receive_string')
    received_string = request.data.decode() # decode the bytes to a string
    data = json.loads(received_string)
    data_code = data['code']
    decoded_data = base64.b64decode(data_code)
    functions_array  = [func for func in dir(task1_example) if callable(getattr(task1_example, func))]
    filtered_functions_array = [element for element in functions_array if "test_" in element]
    for function in filtered_functions_array:
        test_fn = getattr(task1_example, function)
        output = test_fn(decoded_data)
        print(output)
    logger.debug('Received string: %s', received_string)
    result = subprocess.run(["python", "tests.py", received_string], capture_output=True, text=True)
    logger.debug('Tests.py output: %s', result.stdout)

    response = app.response_class(
        response=result.stdout,
        status=200,
        mimetype='application/json'
    )
    logger.info('Returning response: %s', response)
    return response

if __name__ == '__main__':
    app.run(host='0.0.0.0')


