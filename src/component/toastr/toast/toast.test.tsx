import { render, screen } from "@testing-library/react";
import Toast from "./toast";

describe("Toast Component", () => {
  test("renders the Toast component with a message", () => {
    render(<Toast message="Test Message" type="success" />);
    const toastElement = screen.getByText("Test Message");
    expect(toastElement).toBeInTheDocument();
  });

  test("applies the correct class based on the type prop", () => {
    render(<Toast message="Success Message" type="success" />);
    const toastElement = screen.getByText("Success Message");
    expect(toastElement).toHaveClass("toast");
    expect(toastElement).toHaveClass("success");

    render(<Toast message="Error Message" type="error" />);
    const errorToastElement = screen.getByText("Error Message");
    expect(errorToastElement).toHaveClass("toast");
    expect(errorToastElement).toHaveClass("error");
  });
});
