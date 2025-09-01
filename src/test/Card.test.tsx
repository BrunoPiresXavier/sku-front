import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, type MockedFunction } from "vitest";
import { Card } from "../components/Card/Card";

// Mock dos módulos
vi.mock("../clients/sku.client", () => ({
  updateStatus: vi.fn(),
  updateSku: vi.fn(),
  findById: vi.fn(),
}));

vi.mock("../utils/rules", () => ({
  rules: {
    PRE_CADASTRO: {
      editablefields: ["description", "commercialDescription", "sku"],
      statusAllowed: ["CADASTRO_COMPLETO", "CANCELADO"],
    },
    CADASTRO_COMPLETO: {
      editablefields: ["commercialDescription"],
      statusAllowed: ["PRE_CADASTRO", "ATIVO", "CANCELADO"],
    },
    ATIVO: {
      editablefields: [],
      statusAllowed: ["DESATIVADO"],
    },
    DESATIVADO: {
      editablefields: [],
      statusAllowed: ["ATIVO", "PRE_CADASTRO"],
    },
    CANCELADO: {
      editablefields: [],
      statusAllowed: [],
    },
  },
}));

describe("Card", () => {
  const mockProps = {
    id: "1",
    description: "Test SKU",
    commercialDescription: "Test Commercial Description",
    sku: "TEST-001",
    status: "PRE_CADASTRO",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  };

  it("should render status select with correct options", () => {
    render(<Card {...mockProps} />);

    // Verificar se o select está presente
    const select = screen.getByDisplayValue("Alterar Status");
    expect(select).toBeInTheDocument();

    // Verificar se as opções corretas estão presentes
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(3); // "Alterar Status" + 2 opções permitidas

    // Verificar se o status atual está exibido (usando o label amigável)
    expect(screen.getByText("Pre cadastro")).toBeInTheDocument();
  });

  it("should not render select when no status changes are allowed", () => {
    const cancelledProps = { ...mockProps, status: "CANCELADO" };
    render(<Card {...cancelledProps} />);

    // Verificar se o select não está presente para status CANCELADO
    expect(
      screen.queryByDisplayValue("Alterar Status")
    ).not.toBeInTheDocument();

    // Mas o status atual deve estar visível (usando o label amigável)
    expect(screen.getByText("Cancelado")).toBeInTheDocument();
  });

  it("should call updateStatus when select option is changed", async () => {
    const { updateStatus } = await import("../clients/sku.client");
    const mockUpdateStatus = updateStatus as MockedFunction<
      typeof updateStatus
    >;
    mockUpdateStatus.mockResolvedValue({
      ...mockProps,
      status: "CADASTRO_COMPLETO",
    });

    render(<Card {...mockProps} />);

    const select = screen.getByDisplayValue("Alterar Status");

    // Simular mudança de status
    fireEvent.change(select, { target: { value: "CADASTRO_COMPLETO" } });

    await waitFor(() => {
      expect(updateStatus).toHaveBeenCalledWith("1", "CADASTRO_COMPLETO");
    });
  });

  it("should stop propagation when clicking on select", () => {
    const mockClickHandler = vi.fn();

    render(
      <div onClick={mockClickHandler}>
        <Card {...mockProps} />
      </div>
    );

    const select = screen.getByDisplayValue("Alterar Status");
    fireEvent.click(select);

    // O click no select não deve propagar para o elemento pai
    expect(mockClickHandler).not.toHaveBeenCalled();
  });

  it("should apply correct background colors to status", () => {
    render(<Card {...mockProps} />);

    const statusElement = screen.getByText("Pre cadastro");
    expect(statusElement).toHaveStyle("background-color: rgb(245, 158, 11)");
  });
});
