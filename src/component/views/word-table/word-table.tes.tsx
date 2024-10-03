import { fireEvent, render, screen } from "@testing-library/react";
import { PuzzleSolverResponseDTO } from "src/data/dtos/puzzle/puzzle-solver-dto";
import AppWordTableComponent from "./word-table";

describe("AppWordTableComponent", () => {
  const mockClose = jest.fn();
  const mockData: PuzzleSolverResponseDTO[] = [
    { word: "test1", count: 10, value: "1" },
    { word: "test2", count: 20, value: "2" },
  ];
  const mockMax = 20;

  beforeEach(() => {
    render(
      <AppWordTableComponent close={mockClose} data={mockData} max={mockMax} />
    );
  });

  test("renders the component with provided data", () => {
    expect(screen.getByText("Words found")).toBeInTheDocument();
    expect(screen.getByText("test1")).toBeInTheDocument();
    expect(screen.getByText("test2")).toBeInTheDocument();
  });

  test("calls close function when close icon is clicked", () => {
    fireEvent.click(screen.getByRole("button"));
    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  test("renders LolipopComponent with correct props", () => {
    const lolipopComponents = screen.getAllByTestId("lolipop-component");
    expect(lolipopComponents).toHaveLength(mockData.length);
    expect(lolipopComponents[0]).toHaveAttribute("value", "10");
    expect(lolipopComponents[0]).toHaveAttribute("max", "20");
    expect(lolipopComponents[1]).toHaveAttribute("value", "20");
    expect(lolipopComponents[1]).toHaveAttribute("max", "20");
  });
});
