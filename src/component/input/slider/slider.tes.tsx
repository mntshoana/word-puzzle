import { fireEvent, render, screen } from "@testing-library/react";
import SliderComponent from "./slider";

describe("SliderComponent", () => {
  test("renders slider with label", () => {
    render(
      <SliderComponent
        min={0}
        max={100}
        label="Volume"
        value={50}
        disabled={false}
        valueChange={() => {}}
      />
    );
    const labelElement = screen.getByText(/Volume/i);
    expect(labelElement).toBeInTheDocument();
  });

  test("slider has correct initial value", () => {
    render(
      <SliderComponent
        min={0}
        max={100}
        label="Volume"
        value={30}
        disabled={false}
        valueChange={() => {}}
      />
    );
    const sliderElement = screen.getByRole("slider");
    expect(sliderElement).toHaveValue("30");
  });

  test("calls valueChange handler when slider value changes", () => {
    const handleChange = jest.fn();
    render(
      <SliderComponent
        min={0}
        max={100}
        label="Volume"
        value={50}
        disabled={false}
        valueChange={handleChange}
      />
    );
    const sliderElement = screen.getByRole("slider");
    fireEvent.change(sliderElement, { target: { value: 70 } });
    expect(handleChange).toHaveBeenCalledWith(70);
  });

  test("applies additional className", () => {
    render(
      <SliderComponent
        min={0}
        max={100}
        label="Volume"
        value={50}
        disabled={false}
        valueChange={() => {}}
        className="extra-class"
      />
    );
    const containerElement =
      screen.getByRole("slider").parentElement?.parentElement;
    expect(containerElement).toHaveClass("extra-class");
  });

  test("displays correct min and max values", () => {
    render(
      <SliderComponent
        min={10}
        max={90}
        label="Volume"
        value={50}
        disabled={false}
        valueChange={() => {}}
      />
    );
    const minValueElement = screen.getByText(/10/);
    const maxValueElement = screen.getByText(/90/);
    expect(minValueElement).toBeInTheDocument();
    expect(maxValueElement).toBeInTheDocument();
  });
});
