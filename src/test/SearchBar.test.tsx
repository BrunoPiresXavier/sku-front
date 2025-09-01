import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchBar } from "../components/SearchBar/SearchBar";

describe("SearchBar", () => {
  const mockOnSearchChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render search", () => {
    render(<SearchBar onSearchChange={mockOnSearchChange} />);

    const input = screen.getByPlaceholderText("Digite o SKU...");
    expect(input).toBeInTheDocument();
  });

  it("should update when typing", async () => {
    const user = userEvent.setup();
    render(<SearchBar onSearchChange={mockOnSearchChange} />);

    const input = screen.getByPlaceholderText("Digite o SKU...");

    await user.type(input, "SKU123");

    expect(input).toHaveValue("SKU123");
  });
});
