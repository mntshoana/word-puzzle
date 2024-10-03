import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ToasterContext } from "component/toastr/toastr.service";
import { WORD_LIMIT } from "data/constants/word-limit";
import { HttpClientService } from "service/http-client-service/http-client.service";
import AppGeneratorComponent from "./generator";

jest.mock("service/http-client-service/http-client.service");

describe("AppGeneratorComponent", () => {
  const addToast = jest.fn();
  const mockHttpClientService = HttpClientService as jest.MockedClass<
    typeof HttpClientService
  >;

  beforeEach(() => {
    render(
      <ToasterContext.Provider value={addToast}>
        <AppGeneratorComponent />
      </ToasterContext.Provider>
    );
  });

  test("renders initial state correctly", () => {
    expect(screen.getByText("Generate by word count")).toBeInTheDocument();
    expect(screen.getByRole("spinbutton")).toHaveValue(
      WORD_LIMIT.WORD_COUNT_MINIMUM
    );
    expect(screen.getByText("Generate")).toBeInTheDocument();
  });

  test("switches between generate by word count and minimum length", () => {
    fireEvent.click(screen.getByText("Try by minimum length"));
    expect(
      screen.getByText("Generate using minimum length")
    ).toBeInTheDocument();
    fireEvent.click(screen.getByText("Try by word count"));
    expect(screen.getByText("Generate by word count")).toBeInTheDocument();
  });

  test("shows error message for invalid word count", () => {
    fireEvent.change(screen.getByRole("spinbutton"), {
      target: { value: WORD_LIMIT.WORD_COUNT_MAXIMUM + 1 },
    });
    fireEvent.blur(screen.getByRole("spinbutton"));
    expect(
      screen.getByText(
        `Word count must be between ${WORD_LIMIT.WORD_COUNT_MINIMUM} and ${WORD_LIMIT.WORD_COUNT_MAXIMUM}`
      )
    ).toBeInTheDocument();
  });

  test("shows error message for invalid minimum length", () => {
    fireEvent.click(screen.getByText("Try by minimum length"));
    fireEvent.change(screen.getByRole("slider"), {
      target: { value: WORD_LIMIT.MIN_LENGTH_MAXIMUM + 1 },
    });
    fireEvent.blur(screen.getByRole("slider"));
    expect(
      screen.getByText(
        `Min length count must be between ${WORD_LIMIT.MIN_LENGTH_MINIMUM} and ${WORD_LIMIT.MIN_LENGTH_MAXIMUM}`
      )
    ).toBeInTheDocument();
  });

  test("submits form and displays result", async () => {
    const mockResponse = { wordSequence: "test sequence" };
    mockHttpClientService.prototype.get.mockResolvedValue(mockResponse);

    fireEvent.click(screen.getByText("Generate"));

    await waitFor(() =>
      expect(screen.getByText("test sequence")).toBeInTheDocument()
    );
    expect(addToast).toHaveBeenCalledWith("Done", "success");
  });

  test("handles submission error", async () => {
    mockHttpClientService.prototype.get.mockRejectedValue(
      new Error("Network error")
    );

    fireEvent.click(screen.getByText("Generate"));

    await waitFor(() =>
      expect(addToast).toHaveBeenCalledWith(
        "System error. Please try again later.Network error",
        "error"
      )
    );
  });
});
