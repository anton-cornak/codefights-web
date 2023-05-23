import sys
import unittest
import json
import random
import string
import time
import timeout_decorator
import logging

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

class StringTest(unittest.TestCase):
    def test_string(self):
        logger.info('Starting test_string()')
        run_this = """ def correct_solution(text: str) -> str:
    return " ".join(
        str(string.ascii_lowercase.index(letter.lower()) + 1)
        for letter in text
        if letter.isalpha()
    )"""


if __name__ == '__main__':
    suite = unittest.TestLoader().loadTestsFromTestCase(StringTest)
    result = unittest.TextTestRunner(verbosity=2).run(suite)
    num_tests = result.testsRun
    num_passed = result.testsRun - len(result.failures) - len(result.errors)
    num_failed = len(result.failures) + len(result.errors)
    data = {'run': num_tests, 'passed': num_passed, 'failed': num_failed}
    logger.info('Test results: %s', data)
    print(json.dumps(data))
