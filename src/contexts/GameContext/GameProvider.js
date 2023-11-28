import React, { useReducer } from "react";
import { Deck, Statuses, PlayerTypes } from "../../constants";
import { shuffle, calculateScore } from "../../utils";
import { GameContext } from "../../contexts";

const initialPlayerState = {
  name: "Georgian",
  type: PlayerTypes.Player,
  score: 0,
  currentCards: [],
};

const initialDealerState = {
  name: "Anna",
  type: PlayerTypes.Dealer,
  score: 0,
  currentCards: [],
};

// Define the initial state
const initialState = {
  deck: Deck,
  dealer: initialDealerState,
  player: initialPlayerState,
  status: Statuses.Welcome,
};

const initializeGame = (state) => {
  const shuffledDeck = shuffle(state.deck);
  const playerCards = shuffledDeck.slice(-2);
  const playerScore = calculateScore(playerCards, false);

  shuffledDeck.splice(-2);

  const dealerCards = shuffledDeck.slice(-2);
  const dealerScore = calculateScore(dealerCards, true);

  shuffledDeck.splice(-2);

  return {
    ...state,
    status: Statuses.Playing,
    deck: shuffledDeck,
    player: {
      ...state.player,
      currentCards: playerCards,
      score: playerScore,
    },
    dealer: {
      ...state.dealer,
      currentCards: dealerCards,
      score: dealerScore,
    },
  };
};

// Define the reducer function
const gameReducer = (state, action) => {
  switch (action.type) {
    case "INITIALIZE_GAME": {
      return initializeGame(initialState);
    }

    case "HIT_PLAYER": {
      const isPlayer = state.status === Statuses.Playing;
      const isDealer = state.status === Statuses.Waiting;
      const playerCards = [
        ...(isPlayer ? state.player.currentCards : []),
        ...(isDealer ? state.dealer.currentCards : []),
        ...state.deck.slice(-1),
      ];
      const playerScore = calculateScore(playerCards, false);
      const currentDeck = state.deck.slice(0, -1);

      return {
        ...state,
        ...(isPlayer
          ? {
              player: {
                ...state.player,
                currentCards: playerCards,
                score: playerScore,
              },
            }
          : {}),
        ...(isDealer
          ? {
              dealer: {
                ...state.dealer,
                currentCards: playerCards,
                score: playerScore,
              },
            }
          : {}),
        deck: currentDeck,
      };
    }

    case "STAND_PLAYER": {
      if (state.status === Statuses.Playing) {
        const dealerScore = calculateScore(state.dealer.currentCards, false);

        return {
          ...state,
          status: Statuses.Waiting,
          dealer: {
            ...state.dealer,
            score: dealerScore,
          },
        };
      }

      return {
        ...state,
        status: Statuses.GameOver,
      };
    }

    case "CHANGE_STATUS":
      return {
        ...state,
        status: action.payload,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

// Create a provider component
const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
