import React from "react";
import { render } from "@testing-library/react";
import { GameProvider } from "../../contexts";
import { PlayerTypes, Statuses } from "../../constants";
import Table from "./Table";
import useGame from "../../hooks/use-game";

const player = {
  name: "Georgian",
  type: PlayerTypes.Player,
  score: 0,
  currentCards: [],
};

const dealer = {
  name: "Anna",
  type: PlayerTypes.Dealer,
  score: 0,
  currentCards: [],
};

// Mock the useGame hook to provide the necessary context
jest.mock("../../hooks/use-game", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("Table component", () => {
  const renderTable = () => {
    return render(
      <GameProvider>
        <Table />
      </GameProvider>
    );
  };

  test("initializes the game on mount'", () => {
    // Mock the useGame hook to return a specific status
    const dispatch = jest.fn();

    useGame.mockReturnValue({
      state: { status: Statuses.Playing, player, dealer },
      dispatch,
    });

    renderTable();

    expect(dispatch).toHaveBeenCalledWith({ type: "INITIALIZE_GAME" });
  });

  test("renders player and dealer components", () => {
    useGame.mockReturnValue({
      state: { player, dealer, status: Statuses.Playing },
      dispatch: jest.fn(),
    });

    const { getByTestId } = renderTable();
    expect(getByTestId("player")).toBeInTheDocument();
    expect(getByTestId("actions")).toBeInTheDocument();
    expect(getByTestId("dealer")).toBeInTheDocument();
  });

  test("changes the game status to Busted when player score is greater than 21", () => {
    const dispatch = jest.fn();
    useGame.mockReturnValue({
      state: {
        player: { ...player, score: 22 },
        dealer: { ...dealer, score: 10 },
        status: Statuses.Playing,
      },
      dispatch,
    });

    renderTable();
    expect(dispatch).toHaveBeenCalledWith({
      type: "CHANGE_STATUS",
      payload: Statuses.Busted,
    });
  });

  test("changes the game status to Winner when player score is greater than the dealer score", () => {
    const dispatch = jest.fn();
    useGame.mockReturnValue({
      state: {
        player: { ...player, score: 20 },
        dealer: { ...dealer, score: 18 },
        status: Statuses.GameOver,
      },
      dispatch,
    });

    renderTable();
    expect(dispatch).toHaveBeenCalledWith({
      type: "CHANGE_STATUS",
      payload: Statuses.Winner,
    });
  });

  test("changes the game status to Winner when the dealer busted", () => {
    const dispatch = jest.fn();
    useGame.mockReturnValue({
      state: {
        player: { ...player, score: 20 },
        dealer: { ...dealer, score: 27 },
        status: Statuses.Waiting,
      },
      dispatch,
    });

    renderTable();
    expect(dispatch).toHaveBeenCalledWith({
      type: "CHANGE_STATUS",
      payload: Statuses.Winner,
    });
  });

  test("changes the game status to Lost when the dealer has more points", () => {
    const dispatch = jest.fn();
    useGame.mockReturnValue({
      state: {
        player: { ...player, score: 17 },
        dealer: { ...dealer, score: 19 },
        status: Statuses.GameOver,
      },
      dispatch,
    });

    renderTable();
    expect(dispatch).toHaveBeenCalledWith({
      type: "CHANGE_STATUS",
      payload: Statuses.Lost,
    });
  });

  test("changes the game status to Tie when the number of points is equal", () => {
    const dispatch = jest.fn();
    useGame.mockReturnValue({
      state: {
        player: { ...player, score: 21 },
        dealer: { ...dealer, score: 21 },
        status: Statuses.GameOver,
      },
      dispatch,
    });

    renderTable();
    expect(dispatch).toHaveBeenCalledWith({
      type: "CHANGE_STATUS",
      payload: Statuses.Tie,
    });
  });
});
