import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import Content from "./Content";

describe("Content component", () => {
  test("renders Content component with Game component for the root path", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Content />
      </MemoryRouter>
    );

    const contentElement = screen.getByTestId("content");
    const gameComponent = screen.getByTestId("game");

    expect(contentElement).toBeInTheDocument();
    expect(gameComponent).toBeInTheDocument();
  });

  test("renders Content component with NotFound component for an unknown path", () => {
    render(
      <MemoryRouter initialEntries={["/unknown-path"]}>
        <Content />
      </MemoryRouter>
    );

    const contentElement = screen.getByTestId("content");
    const notFoundComponent = screen.getByTestId("not-found");

    expect(contentElement).toBeInTheDocument();
    expect(notFoundComponent).toBeInTheDocument();
  });
});
