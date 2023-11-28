import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { GameProvider } from "../../contexts";
import { PlayerTypes, Statuses } from "../../constants";
import Actions from "./Actions";
import useGame from "../../hooks/use-game";

const player = {
  name: "Georgian",
  type: PlayerTypes.Player,
  score: 19,
  currentCards: [],
};

const dealer = {
  name: "Anna",
  type: PlayerTypes.Dealer,
  score: 17,
  currentCards: [],
};

// Mock the useGame hook to provide the necessary context
jest.mock("../../hooks/use-game", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("Actions component", () => {
  const renderActions = () => {
    return render(
      <GameProvider>
        <Actions />
      </GameProvider>
    );
  };

  test("renders the actions div", () => {
    useGame.mockReturnValue({
      state: {
        status: Statuses.Playing,
        player,
        dealer,
      },
      dispatch: jest.fn(),
    });

    const { getByTestId } = renderActions();
    expect(getByTestId("actions")).toBeInTheDocument();
  });

  test("displays the correct message when playing", () => {
    useGame.mockReturnValue({
      state: {
        status: Statuses.Playing,
        player,
        dealer,
      },
      dispatch: jest.fn(),
    });

    const { getByTestId } = renderActions();
    expect(getByTestId("message")).toHaveTextContent(
      "Hit the road, Jack! It's time for you to win some real money."
    );
  });

  test("displays the correct message when status is Winner", () => {
    useGame.mockReturnValue({
      state: {
        status: Statuses.Winner,
        player,
        dealer,
      },
      dispatch: jest.fn(),
    });

    const { getByTestId } = renderActions();
    expect(getByTestId("message")).toHaveTextContent(
      "Congrats! Today is your lucky day. You won!"
    );
  });

  test("displays the correct message when status is Lost", () => {
    useGame.mockReturnValue({
      state: {
        status: Statuses.Lost,
        player,
        dealer,
      },
      dispatch: jest.fn(),
    });

    const { getByTestId } = renderActions();
    expect(getByTestId("message")).toHaveTextContent(
      "It wasn't your best day, my friend. You lost!"
    );
  });

  test("triggers hit action correctly", () => {
    const mockDispatch = jest.fn();
    useGame.mockReturnValue({
      state: {
        status: Statuses.Playing,
        player,
        dealer,
      },
      dispatch: mockDispatch,
    });

    const { getByTestId } = renderActions();

    fireEvent.click(getByTestId("hit-button"));
    expect(mockDispatch).toHaveBeenCalledWith({ type: "HIT_PLAYER" });
  });

  test("triggers stand action correctly", () => {
    const mockDispatch = jest.fn();
    useGame.mockReturnValue({
      state: {
        status: Statuses.Playing,
        player,
        dealer,
      },
      dispatch: mockDispatch,
    });

    const { getByTestId } = renderActions();

    fireEvent.click(getByTestId("stand-button"));
    expect(mockDispatch).toHaveBeenCalledWith({ type: "STAND_PLAYER" });
  });

  test("disables the Stand button when player score is less than 17", () => {
    useGame.mockReturnValue({
      state: {
        status: Statuses.Playing,
        player: { ...player, score: 14 },
        dealer,
      },
      dispatch: jest.fn(),
    });

    const { getByTestId } = renderActions();
    const standButton = getByTestId("stand-button");

    expect(standButton).toHaveAttribute("disabled");
  });

  test("does not disable the Stand button when player score is 17 or higher", () => {
    useGame.mockReturnValue({
      state: {
        status: Statuses.Playing,
        player,
        dealer,
      },
      dispatch: jest.fn(),
    });

    const { getByTestId } = renderActions();
    const standButton = getByTestId("stand-button");

    expect(standButton).not.toHaveAttribute("disabled");
  });

  test("hides Hit and Stand buttons and shows Play Again button when player is busted", () => {
    useGame.mockReturnValue({
      state: {
        status: Statuses.Busted,
        player: { ...player, score: 23 },
        dealer,
      },
      dispatch: jest.fn(),
    });

    const { getByTestId, queryByTestId } = renderActions();

    expect(queryByTestId("hit-button")).toBeNull();
    expect(queryByTestId("stand-button")).toBeNull();
    expect(getByTestId("play-again-button")).toBeInTheDocument();
  });

  test("does not hide Hit and Stand buttons and hides Play Again button when player is not busted", () => {
    useGame.mockReturnValue({
      state: {
        status: Statuses.Waiting,
        player,
        dealer,
      },
      dispatch: jest.fn(),
    });

    const { getByTestId, queryByTestId } = renderActions();

    expect(getByTestId("hit-button")).toBeInTheDocument();
    expect(getByTestId("stand-button")).toBeInTheDocument();
    expect(queryByTestId("play-again-button")).toBeNull();
  });
});
