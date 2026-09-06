import { describe, expect, it } from "vitest";
import { getPaginationState, INTERESTS_PAGE_SIZE } from "./pagination";

describe("getPaginationState", () => {
  it("uses 20 items per page by default", () => {
    expect(INTERESTS_PAGE_SIZE).toBe(20);
    expect(getPaginationState(185, 1)).toEqual({
      currentPage: 1,
      totalPages: 10,
      startIndex: 0,
      endIndex: 20,
      startItem: 1,
      endItem: 20,
    });
  });

  it("returns the remaining items on the final page", () => {
    expect(getPaginationState(185, 10)).toMatchObject({
      currentPage: 10,
      startIndex: 180,
      endIndex: 185,
      startItem: 181,
      endItem: 185,
    });
  });

  it("clamps pages to the available range", () => {
    expect(getPaginationState(275, 99).currentPage).toBe(14);
    expect(getPaginationState(275, 0).currentPage).toBe(1);
  });
});
