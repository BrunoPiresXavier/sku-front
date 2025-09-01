import { describe, it, expect } from "vitest";

describe("SKU Client Integration", () => {
  it("should have all required client functions exported", async () => {
    const {
      listSku,
      findById,
      updateStatus,
      createSku,
      updateSku,
      searchBySku,
    } = await import("../clients/sku.client");

    expect(typeof listSku).toBe("function");
    expect(typeof findById).toBe("function");
    expect(typeof updateStatus).toBe("function");
    expect(typeof createSku).toBe("function");
    expect(typeof updateSku).toBe("function");
    expect(typeof searchBySku).toBe("function");
  });
});
