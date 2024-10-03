import { render, screen } from "@testing-library/react";
import AppHeader from "./header";

describe("AppHeader", () => {
  test("renders the header with correct class", () => {
    render(<AppHeader />);
    const headerElement = screen.getByRole("main");
    expect(headerElement).toHaveClass("header");
  });

  test("renders the title link with correct href", () => {
    render(<AppHeader />);
    const titleLink = screen.getByRole("link", { name: /ord/i });
    expect(titleLink).toHaveAttribute("href", "/");
  });

  test("renders the title with correct text", () => {
    render(<AppHeader />);
    const titleElement = screen.getByRole("heading", { name: /ord/i });
    expect(titleElement).toBeInTheDocument();
  });

  test("renders the generator text", () => {
    render(<AppHeader />);
    const generatorText = screen.getByText(/generator/i);
    expect(generatorText).toBeInTheDocument();
  });
});
