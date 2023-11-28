import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders App component", () => {
  render(<App />);

  // Check if the header is rendered
  const headerElement = screen.getByTestId("header");
  expect(headerElement).toBeInTheDocument();

  // Check if the content is rendered
  const contentElement = screen.getByTestId("content");
  expect(contentElement).toBeInTheDocument();

  // Check if the footer is rendered
  const footerElement = screen.getByTestId("footer");
  expect(footerElement).toBeInTheDocument();
});
