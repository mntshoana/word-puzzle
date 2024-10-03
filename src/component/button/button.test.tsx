import { fireEvent, render, screen } from "@testing-library/react";
import ButtonComponent from "./button";

describe("ButtonComponent", () => {
  test("renders button with label", () => {
    render(
      <ButtonComponent onClick={() => {}} label="Click Me" disabled={false} />
    );
    const buttonElement = screen.getByText(/Click Me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test("button is disabled when disabled prop is true", () => {
    render(
      <ButtonComponent onClick={() => {}} label="Click Me" disabled={true} />
    );
    const buttonElement = screen.getByText(/Click Me/i);
    expect(buttonElement).toBeDisabled();
  });

  test("button is enabled when disabled prop is false", () => {
    render(
      <ButtonComponent onClick={() => {}} label="Click Me" disabled={false} />
    );
    const buttonElement = screen.getByText(/Click Me/i);
    expect(buttonElement).toBeEnabled();
  });

  test("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(
      <ButtonComponent
        onClick={handleClick}
        label="Click Me"
        disabled={false}
      />
    );
    const buttonElement = screen.getByText(/Click Me/i);
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("applies additional className", () => {
    render(
      <ButtonComponent
        onClick={() => {}}
        label="Click Me"
        disabled={false}
        className="extra-class"
      />
    );
    const buttonElement = screen.getByText(/Click Me/i);
    expect(buttonElement).toHaveClass("extra-class");
  });
});
