// src/app/page.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./page";

describe("Home page", () => {
  beforeEach(() => {
    render(<Home />);
  });

  it("renders the heading", () => {
    expect(screen.getByRole("heading", { name: /startup idea assistant/i })).toBeInTheDocument();
  });

  it("renders three inputs and a button", () => {
    expect(screen.getByLabelText(/domain/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/trend/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/audience/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /generate idea/i })).toBeInTheDocument();
  });

  it("allows typing into the inputs", async () => {
    const user = userEvent.setup();
    const domainInput = screen.getByLabelText(/domain/i) as HTMLInputElement;
    await user.type(domainInput, "healthcare");
    expect(domainInput).toHaveValue("healthcare");
  });
});
