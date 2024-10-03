import { fireEvent, render, screen } from "@testing-library/react";
import TextInputComponent from "./text";

describe("TextInputComponent", () => {
  test("renders input with initial value", () => {
    render(<TextInputComponent value="initial" onChange={() => {}} />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveValue("initial");
  });

  test("calls onChange handler when input value changes", () => {
    const handleChange = jest.fn();
    render(<TextInputComponent value="" onChange={handleChange} />);
    const inputElement = screen.getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: "new value" } });
    expect(handleChange).toHaveBeenCalledWith("new value");
  });

  test("displays error message when error prop is provided", () => {
    render(
      <TextInputComponent value="" onChange={() => {}} error="Error message" />
    );
    const errorElement = screen.getByText(/Error message/i);
    expect(errorElement).toBeInTheDocument();
  });

  test("displays warning message when warn prop is provided", () => {
    render(
      <TextInputComponent value="" onChange={() => {}} warn="Warning message" />
    );
    const warnElement = screen.getByText(/Warning message/i);
    expect(warnElement).toBeInTheDocument();
  });

  test("calls onBlur handler when input loses focus", () => {
    const handleBlur = jest.fn();
    render(
      <TextInputComponent value="" onChange={() => {}} onBlur={handleBlur} />
    );
    const inputElement = screen.getByRole("textbox");
    fireEvent.blur(inputElement, { target: { value: "blurred value" } });
    expect(handleBlur).toHaveBeenCalledWith("blurred value");
  });

  test("validates input value against regex", () => {
    const handleValidate = jest.fn();
    render(
      <TextInputComponent
        value=""
        onChange={() => {}}
        regex={/^\d+$/}
        onValidate={handleValidate}
      />
    );
    const inputElement = screen.getByRole("textbox");
    fireEvent.blur(inputElement, { target: { value: "123" } });
    expect(handleValidate).toHaveBeenCalledWith(true);
    fireEvent.blur(inputElement, { target: { value: "abc" } });
    expect(handleValidate).toHaveBeenCalledWith(false);
  });

  test("applies additional className", () => {
    render(
      <TextInputComponent
        value=""
        onChange={() => {}}
        className="extra-class"
      />
    );
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveClass("extra-class");
  });

  test("disables input when disabled prop is true", () => {
    render(<TextInputComponent value="" onChange={() => {}} disabled={true} />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeDisabled();
  });
});
