"""
In the first challange, you are asked to replace every letter with its position in the alphabet.

"a" = 1
"b" = 2
etc.

Return only letters: if string contains other symbols, ignore them.

This is the first example challenge. Obviously, this needs to be updated heavily for the whole code-fights service concept.
Consider the following code to be only an example on how to evaluate the code
"""
import unittest
import random
import string
import time
import timeout_decorator


def alphabet_solution(text: str) -> str:
    """
    Placeholder - this is user input
    """
    return text


def correct_solution(text: str) -> str:
    """
    Returns letter alphabet position
    """
    return " ".join(
        str(string.ascii_lowercase.index(letter.lower()) + 1)
        for letter in text
        if letter.isalpha()
    )


class AlphabetTestCase(unittest.TestCase):
    """
    Unit tests
    """

    def test_predefined(self):
        """
        Test edge cases
        """
        testcases = [
            "abcdefghijklmnopqrstuvwxyz",
            "         a      ",
            "./}!@*&#@&^$",
            "./*&#}!@as@2dz&^$",
            "The sunset sets at twelve o' clock.",
            "The narwhal bacons at midnight.",
            "Visma Labs Slovakia",
            "I love code fights!",
            "abcdefghijklmnopqrstuvwxyz",
            "1230984192381029",
        ]
        for testcase in testcases:
            actual = alphabet_solution(testcase)
            expected = correct_solution(testcase)
            self.assertEqual(
                actual,
                expected,
                f'\nfailed test case "{testcase}": expected "{expected}", but got "{actual}".',
            )

    @timeout_decorator.timeout(5)
    def test_random_lowercase(self):
        """
        Test randomly generated strings - lowercase
        """
        for _ in range(10):
            testcase = "".join(random.choices(string.ascii_lowercase, k=300))
            actual = alphabet_solution(testcase)
            expected = correct_solution(testcase)
            self.assertEqual(
                actual,
                expected,
                f'\nfailed test case "{testcase}": expected "{expected}", but got "{actual}".',
            )

    @timeout_decorator.timeout(5)
    def test_random_uppercase(self):
        """
        Test randomly generated strings - uppercase
        """
        for _ in range(10):
            testcase = "".join(random.choices(string.ascii_uppercase, k=300))
            actual = alphabet_solution(testcase)
            expected = correct_solution(testcase)
            self.assertEqual(
                actual,
                expected,
                f'\nfailed test case "{testcase}": expected "{expected}", but got "{actual}".',
            )

    @timeout_decorator.timeout(20)
    def test_performance(self):
        """
        Performance test
        """
        times = []

        for _ in range(10):
            st = time.process_time()
            for _ in range(100):
                alphabet_solution(
                    "".join(random.choices(string.ascii_uppercase, k=10000))
                )
            et = time.process_time()
            times.append(et - st)

        print(
            f"\nYour average execution time is: {sum(times)/len(times)}s. Benchmark: 0.6s."
        )


if __name__ == "__main__":
    unittest.main(verbosity=0)
