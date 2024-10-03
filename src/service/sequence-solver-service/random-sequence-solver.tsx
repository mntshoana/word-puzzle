/**
 * Calculates the count of each letter in a given string.
 *
 * @param str - The input string to analyze.
 * @returns An object where the keys are letters and the values are the counts of those letters in the input string.
 */
const getLetterCount = (str: string): Record<string, number> => {
  const letterCount: Record<string, number> = {};
  for (const letter of str) {
    letterCount[letter] = (letterCount[letter] || 0) + 1;
  }
  return letterCount;
};

/**
 * Sorts an array of words based on the frequency of their least frequent letter.
 *
 * @param words - An array of words to be sorted.
 * @param letterCount - A record containing the frequency of each letter.
 * @returns A new array of words sorted by the frequency of their least frequent letter in ascending order.
 */
const sortByLeastFrequentLetter = (
  words: string[],
  letterCount: Record<string, number>
): string[] => {
  return [...words].sort((a, b) => {
    // Get the rarest letter in each word
    const minA = Math.min(
      ...a.split("").map((letter) => letterCount[letter] || 0)
    );
    const minB = Math.min(
      ...b.split("").map((letter) => letterCount[letter] || 0)
    );
    return minA - minB;
  });
};

/**
 * Counts the occurrences of each word from the `wordsInput` array that can be formed using the letters in `randomString`.
 *
 * @param {string} randomString - The string containing the letters available to form words.
 * @param {string[]} wordsInput - An array of words to count occurrences for.
 * @returns {Record<string, number>} An object where the keys are words from `wordsInput` and the values are the number of times each word can be formed using the letters in `randomString`.
 *
 * @example
 * const randomString = "nsenofeeeonresvverheut";
 * const wordsInput = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
 * const result = countWordsInString(randomString, wordsInput);
 * // result will be {"zero":0, "one": 1, "two": 0, "three": 1, "four": 1,
 * //                 "five": 0, "six": 0, "seven":2,
 * //                 "eight" 0, "nine": 0, "ten": 0 }
 */
export const countWordsInString = (randomString, wordsInput) => {
  const letterCountOfPuzzle = getLetterCount(randomString);
  const sortedWordsInput = sortByLeastFrequentLetter(
    wordsInput,
    letterCountOfPuzzle
  );

  const count = {};
  for (const word of sortedWordsInput) {
    count[word] = 0;

    while (true) {
      const letterCountUsed = {};
      let canFormWord = true;

      // Form word with available letters
      for (const letter of word) {
        letterCountUsed[letter] = (letterCountUsed[letter] || 0) + 1;
        if (
          !letterCountOfPuzzle[letter] ||
          letterCountUsed[letter] > letterCountOfPuzzle[letter]
        ) {
          canFormWord = false;
          break;
        }
      }

      if (canFormWord) {
        for (const letter in letterCountUsed) {
          letterCountOfPuzzle[letter] -= letterCountUsed[letter]; //we have less available letters
        }
        count[word]++;
      } else {
        break;
      }
    }
  }

  return count;
};
