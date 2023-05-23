import argparse
import logging


# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

parser = argparse.ArgumentParser(description='My hello world example.')
parser.add_argument('myarg', type=str,
                    help='string that we want to parse')

def test_my_fuction(func):
    input = "abc"
    expected = "1 2 3"
    acctual = func(input)

    if acctual == expected:
        print("Test passed")

    else:
        print("Test failed"),
        print("Expected: ", expected)
        print("Acctual: ", acctual)

if __name__ == '__main__':
    args = parser.parse_args()
    print(args.myarg)

    code = """def correct_solution(text: str) -> str:
    return " ".join(
        str(string.ascii_lowercase.index(letter.lower()) + 1)
        for letter in text
        if letter.isalpha()
    )"""

    exec(code)
    test_my_fuction(correct_solution)
    print("Hello World")
    # exec(import string)



