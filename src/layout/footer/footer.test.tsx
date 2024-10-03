import { render, screen } from "@testing-library/react";
import AppFooter from "./footer";

describe("AppFooter", () => {
  test("renders the footer with correct class", () => {
    render(<AppFooter />);
    const footerElement = screen.getByRole("contentinfo");
    expect(footerElement).toHaveClass("container");
  });

  test("renders the copyright text", () => {
    render(<AppFooter />);
    const copyrightText = screen.getByText(/© 2024 - MN Tshoana/i);
    expect(copyrightText).toBeInTheDocument();
  });

  test("renders the contact number", () => {
    render(<AppFooter />);
    const contactNumber = screen.getByText(/0683189880/i);
    expect(contactNumber).toBeInTheDocument();
  });

  test("renders the privacy policy link with correct href", () => {
    render(<AppFooter />);
    const privacyLink = screen.getByRole("link", { name: /privacy policy/i });
    expect(privacyLink).toHaveAttribute("href", "/privacy");
  });

  test("renders the city text", () => {
    render(<AppFooter />);
    const cityText = screen.getByText(/johannesburg, za/i);
    expect(cityText).toBeInTheDocument();
  });

  test("renders the flag text", () => {
    render(<AppFooter />);
    const flagText = screen.getByText(/100% home grown/i);
    expect(flagText).toBeInTheDocument();
  });

  test("renders the heart text", () => {
    render(<AppFooter />);
    const heartText = screen.getByText(/Made with love/i);
    expect(heartText).toBeInTheDocument();
  });
});
