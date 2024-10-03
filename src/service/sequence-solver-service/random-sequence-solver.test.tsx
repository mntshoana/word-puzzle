import { countWordsInString } from "./random-sequence-solver";

describe("countWordsInString", () => {
  test("counts words correctly when all letters are available", () => {
    const randomString = "nsenofeeeonresvverheut";
    const wordsInput = [
      "zero",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
    ];
    const result = countWordsInString(randomString, wordsInput);
    expect(result).toEqual({
      zero: 0,
      one: 1,
      two: 0,
      three: 1,
      four: 1,
      five: 0,
      six: 0,
      seven: 2,
      eight: 0,
      nine: 0,
      ten: 0,
    });
  });

  test("returns zero counts when no letters are available", () => {
    const randomString = "";
    const wordsInput = ["zero", "one", "two"];
    const result = countWordsInString(randomString, wordsInput);
    expect(result).toEqual({
      zero: 0,
      one: 0,
      two: 0,
    });
  });

  test("counts words correctly with partial letter availability", () => {
    const randomString = "onene";
    const wordsInput = ["one", "two"];
    const result = countWordsInString(randomString, wordsInput);
    expect(result).toEqual({
      one: 1,
      two: 0,
    });
  });

  test("counts words correctly with repeated letters", () => {
    const randomString = "nnnooo";
    const wordsInput = ["no", "on"];
    const result = countWordsInString(randomString, wordsInput);
    expect(result).toEqual({
      no: 3,
      on: 0,
    });
  });

  test("counts words correctly with overlapping letters", () => {
    const randomString = "abcabc";
    const wordsInput = ["abc", "cab"];
    const result = countWordsInString(randomString, wordsInput);
    expect(result).toEqual({
      abc: 2,
      cab: 0,
    });
  });
});
