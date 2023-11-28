import { shuffle as shuffleArray } from "../utils";

// Test case for an empty array
test("shuffleArray with empty array should return an empty array", () => {
  const result = shuffleArray([]);
  expect(result).toHaveLength(0);
});

// Test case for an array with one element
test("shuffleArray with single-element array should return the same array", () => {
  const inputArray = [42];
  const result = shuffleArray(inputArray);
  expect(result).toHaveLength(1);
  expect(result).toEqual(inputArray);
});

// Test case for an array with multiple elements
test("shuffleArray should shuffle the elements of the array", () => {
  const inputArray = [1, 2, 3, 4, 5];
  const result = shuffleArray(inputArray);

  // Check that the length is the same
  expect(result).toHaveLength(inputArray.length);

  // Check that the elements are different from the input array
  expect(result).not.toEqual(inputArray);

  // Check that the elements are still the same, just shuffled
  expect(result.sort()).toEqual(inputArray.sort());
});

// Test case for an array with non-numeric elements
test("shuffleArray should shuffle an array with non-numeric elements", () => {
  const inputArray = ["apple", "banana", "orange", "grape"];
  const result = shuffleArray(inputArray);

  // Check that the length is the same
  expect(result).toHaveLength(inputArray.length);

  // Check that the elements are different from the input array
  expect(result).not.toEqual(inputArray);

  // Check that the elements are still the same type, just shuffled
  expect(result.sort()).toEqual(inputArray.sort());
});
