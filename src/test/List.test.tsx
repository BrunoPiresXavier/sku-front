import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { List } from "../components/List/List";

describe("List Component", () => {
  const mockSkuList = [
    {
      id: "1",
      description: "Product 1",
      commercialDescription: "Commercial desc 1",
      sku: "SKU001",
      status: "PRE_CADASTRO",
      createdAt: new Date("2023-01-01"),
      updatedAt: new Date("2023-01-01"),
    },
    {
      id: "2",
      description: "Product 2",
      commercialDescription: "Commercial desc 2",
      sku: "SKU002",
      status: "ATIVO",
      createdAt: new Date("2023-01-02"),
      updatedAt: new Date("2023-01-02"),
    },
  ];

  it("should render title correctly", () => {
    render(<List list={mockSkuList} />);

    expect(screen.getByText("Lista de SKU's")).toBeInTheDocument();
  });
});
