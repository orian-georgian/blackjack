const calculateScore = (cards, omitFirst) => {
  const sortedCards = [...cards].sort((a, b) => a.score - b.score);

  if (omitFirst && cards.length === 2) {
    return cards[1].score;
  }

  return sortedCards.reduce((total, { score, value }) => {
    const isAce = value === "ACE";
    const aceValue = isAce ? (total + score > 21 ? 1 : 11) : score;

    return total + aceValue;
  }, 0);
};

export default calculateScore;
