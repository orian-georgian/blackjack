import React from "react";
import { render, screen } from "@testing-library/react";
import { GameProvider } from "../../contexts";
import { PlayerTypes } from "../../constants";
import Game from "./Game";
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

const dispatch = jest.fn();

// Mock the useGame hook to provide the necessary context
jest.mock("../../hooks/use-game", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("Game component", () => {
  test("renders Welcome component when status is Welcome", () => {
    // Mock the useGame hook to return a specific status
    useGame.mockReturnValue({
      state: { status: "welcome", player, dealer },
      dispatch,
    });

    const { getByTestId } = render(
      <GameProvider>
        <Game />
      </GameProvider>
    );

    expect(getByTestId("game")).toBeInTheDocument();
    expect(getByTestId("welcome")).toBeInTheDocument();
  });

  test("renders Table component when status is not Welcome", () => {
    // Mock the useGame hook to return a specific status
    useGame.mockReturnValue({
      state: { status: "playing", player, dealer },
      dispatch,
    });

    const { getByTestId } = render(
      <GameProvider>
        <Game />
      </GameProvider>
    );

    expect(getByTestId("game")).toBeInTheDocument();
    expect(getByTestId("table")).toBeInTheDocument();
  });

  it("renders dealer image when status is welcome", () => {
    // Mock the useGame hook to return a specific status
    useGame.mockReturnValue({ state: { status: "welcome", player, dealer } });

    const { getByTestId } = render(
      <GameProvider>
        <Game />
      </GameProvider>
    );

    expect(getByTestId("game")).toBeInTheDocument();
    expect(getByTestId("dealer-image")).toBeInTheDocument();
  });
});
