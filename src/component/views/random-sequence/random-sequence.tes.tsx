import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ToasterContext } from "component/toastr/toastr.service";
import AppRandomSequenceComponent from "./random-sequence";

describe("AppRandomSequenceComponent", () => {
  const addToast = jest.fn();

  beforeEach(() => {
    render(
      <ToasterContext.Provider value={addToast}>
        <AppRandomSequenceComponent />
      </ToasterContext.Provider>
    );
  });

  test("renders initial state correctly", () => {
    expect(
      screen.getByText("See if we can solve a random sequence")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter a random sequence")
    ).toBeInTheDocument();
    expect(screen.getByText("Solve")).toBeInTheDocument();
  });

  test("shows error message for invalid sequence length", () => {
    fireEvent.change(screen.getByPlaceholderText("Enter a random sequence"), {
      target: { value: "a".repeat(WORD_LIMIT.MAX_LENGTH_PUZZLE + 1) },
    });
    fireEvent.blur(screen.getByPlaceholderText("Enter a random sequence"));
    expect(
      screen.getByText(
        `Length of random sequence must be between ${WORD_LIMIT.MIN_LENGTH_MINIMUM} and ${WORD_LIMIT.MAX_LENGTH_PUZZLE}`
      )
    ).toBeInTheDocument();
  });

  test("shows error message for invalid sequence characters", () => {
    fireEvent.change(screen.getByPlaceholderText("Enter a random sequence"), {
      target: { value: "12345" },
    });
    fireEvent.blur(screen.getByPlaceholderText("Enter a random sequence"));
    expect(
      screen.getByText("Only letters are allowed (caps or small)")
    ).toBeInTheDocument();
  });

  test("submits form and displays success message", async () => {
    const mockResponse = [{ count: 1, word: "test" }];
    jest
      .spyOn(HttpClientService.prototype, "post")
      .mockResolvedValue(mockResponse);

    fireEvent.change(screen.getByPlaceholderText("Enter a random sequence"), {
      target: { value: "testsequence" },
    });
    fireEvent.click(screen.getByText("Solve"));

    await waitFor(() =>
      expect(addToast).toHaveBeenCalledWith("Success", "success")
    );
    expect(screen.getByText("test")).toBeInTheDocument();
  });

  test("handles submission error", async () => {
    jest
      .spyOn(HttpClientService.prototype, "post")
      .mockRejectedValue({ status: 400 });

    fireEvent.change(screen.getByPlaceholderText("Enter a random sequence"), {
      target: { value: "testsequence" },
    });
    fireEvent.click(screen.getByText("Solve"));

    await waitFor(() =>
      expect(addToast).toHaveBeenCalledWith(
        "Sorry, we are unable to solve the puzzle you've entered..",
        "error"
      )
    );
  });
});
