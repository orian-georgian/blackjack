import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { PlayerTypes, Statuses } from "../../constants";
import Player from "./Player";

describe("Player component", () => {
  const defaultProps = {
    name: "Georgian",
    type: PlayerTypes.Player,
    score: 19,
    status: Statuses.Playing,
    currentCards: [{ image: "card1.png" }, { image: "card2.png" }],
  };

  test("renders Player component with provided props", () => {
    const { getByTestId, getByText, getAllByAltText } = render(
      <Player {...defaultProps} />
    );

    expect(getByTestId("player")).toBeInTheDocument();
    expect(getByText("Georgian (19 points)")).toBeInTheDocument();
    expect(getAllByAltText("Playing card number")).toHaveLength(
      defaultProps.currentCards.length
    );
  });

  test("renders back card for the first card of the dealer when status is Playing", () => {
    const dealerProps = {
      ...defaultProps,
      type: PlayerTypes.Dealer,
    };

    const { getAllByAltText } = render(<Player {...dealerProps} />);

    const dealerCardImages = getAllByAltText("Playing card number");

    expect(dealerCardImages[0]).toHaveAttribute(
      "src",
      "https://clipart-library.com/new_gallery/222662_playing-card-png.png"
    );
  });

  test("renders Player component with correct status color and pulse class for playing player", () => {
    const { getByTestId } = render(<Player {...defaultProps} />);

    const playerComponent = getByTestId("player");
    const circleElement = playerComponent.querySelector(".circle");

    expect(circleElement).toHaveClass("pulse");
    expect(circleElement).toHaveClass("green");
  });

  it("renders Player component with correct status color for waiting player", () => {
    const playerProps = {
      ...defaultProps,
      status: Statuses.Waiting,
    };

    const { getByTestId } = render(<Player {...playerProps} />);

    const playerComponent = getByTestId("player");
    const circleElement = playerComponent.querySelector(".circle");

    expect(circleElement).not.toHaveClass("pulse");
    expect(circleElement).toHaveClass("red");
  });
});
