// calculateScore.test.js
import { calculateScore } from "../utils";

// Test case for a hand without aces
test("calculateScore calculates score without aces", () => {
  const cards = [
    { score: 10, value: "10" },
    { score: 5, value: "5" },
    { score: 7, value: "7" },
  ];

  const score = calculateScore(cards, false);

  expect(score).toBe(22);
});

// Test case for a hand with aces
test("calculateScore calculates score with aces", () => {
  const cards = [
    { score: 2, value: "2" },
    { score: 11, value: "ACE" },
    { score: 7, value: "7" },
  ];

  const score = calculateScore(cards, false);

  expect(score).toBe(20);
});

// Test case for a hand with ace as 1
test("calculateScore calculates score with ace as ", () => {
  const cards = [
    { score: 10, value: "10" },
    { score: 11, value: "ACE" },
    { score: 7, value: "7" },
  ];

  const score = calculateScore(cards, false);

  expect(score).toBe(18);
});

// Test case to omit the first card (used for dealer's hidden card)
test("calculateScore omits first card", () => {
  const cards = [
    { score: 10, value: "10" },
    { score: 5, value: "5" },
  ];

  const score = calculateScore(cards, true);

  expect(score).toBe(5);
});
