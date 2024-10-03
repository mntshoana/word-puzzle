import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import AppLandingPage from "./home";

jest.mock("component/views/generator/generator", () => () => (
  <div>Generator Component</div>
));
jest.mock("component/views/random-sequence/random-sequence", () => () => (
  <div>Random Sequence Component</div>
));

describe("AppLandingPage", () => {
  test("renders Generator tab by default", () => {
    render(
      <Router>
        <AppLandingPage />
      </Router>
    );

    expect(screen.getByText("Generator Component")).toBeInTheDocument();
  });

  test("switches to Random Sequence tab on click", () => {
    render(
      <Router>
        <AppLandingPage />
      </Router>
    );

    fireEvent.click(screen.getByText("Random Sequence"));

    expect(screen.getByText("Random Sequence Component")).toBeInTheDocument();
  });

  test("applies selected_tab class to the active tab", () => {
    render(
      <Router>
        <AppLandingPage />
      </Router>
    );

    const generatorTab = screen.getByText("Generator");
    const randomSequenceTab = screen.getByText("Random Sequence");

    expect(generatorTab).toHaveClass("selected_tab");
    expect(randomSequenceTab).toHaveClass("non_selected_tab");

    fireEvent.click(randomSequenceTab);

    expect(generatorTab).toHaveClass("non_selected_tab");
    expect(randomSequenceTab).toHaveClass("selected_tab");
  });
});
