import { fireEvent, render, screen } from "@testing-library/react";
import NumberInputComponent from "./number";

describe("NumberInputComponent", () => {
  test("renders input with initial value", () => {
    render(<NumberInputComponent value={10} onChange={() => {}} />);
    const inputElement = screen.getByDisplayValue("10");
    expect(inputElement).toBeInTheDocument();
  });

  test("calls onChange handler when value changes", () => {
    const handleChange = jest.fn();
    render(<NumberInputComponent value={10} onChange={handleChange} />);
    const inputElement = screen.getByDisplayValue("10");
    fireEvent.change(inputElement, { target: { value: "20" } });
    expect(handleChange).toHaveBeenCalledWith(20);
  });

  test("calls onBlur handler when input loses focus", () => {
    const handleBlur = jest.fn();
    render(
      <NumberInputComponent
        value={10}
        onChange={() => {}}
        onBlur={handleBlur}
      />
    );
    const inputElement = screen.getByDisplayValue("10");
    fireEvent.blur(inputElement, { target: { value: "20" } });
    expect(handleBlur).toHaveBeenCalledWith("20");
  });

  test("displays error message when error prop is provided", () => {
    render(
      <NumberInputComponent
        value={10}
        onChange={() => {}}
        error="Error message"
      />
    );
    const errorElement = screen.getByText("Error message");
    expect(errorElement).toBeInTheDocument();
  });

  test("displays warning message when warn prop is provided", () => {
    render(
      <NumberInputComponent
        value={10}
        onChange={() => {}}
        warn="Warning message"
      />
    );
    const warnElement = screen.getByText("Warning message");
    expect(warnElement).toBeInTheDocument();
  });

  test("input is disabled when disabled prop is true", () => {
    render(
      <NumberInputComponent value={10} onChange={() => {}} disabled={true} />
    );
    const inputElement = screen.getByDisplayValue("10");
    expect(inputElement).toBeDisabled();
  });

  test("applies additional className", () => {
    render(
      <NumberInputComponent
        value={10}
        onChange={() => {}}
        className="extra-class"
      />
    );
    const inputElement = screen.getByDisplayValue("10");
    expect(inputElement).toHaveClass("extra-class");
  });
});
