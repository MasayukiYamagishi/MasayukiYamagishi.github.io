import { describe, expect, it } from "vitest";
import type { Book } from "@/schemas/interests";
import { calculateBookWeight } from "./calculateBookWeight";
import { getShelfStage } from "./calculateShelfLoad";
import { getReadingWarnings } from "./getReadingWarning";

const baseBook: Book = {
  id: "test-book",
  title: "Test book",
  author: "Test author",
  pages: 100,
  format: "a5",
  binding: "paperback",
  status: "backlog",
  weightSource: "estimated",
};

describe("calculateBookWeight", () => {
  it("uses half the page count as leaf count for even pages", () => {
    expect(calculateBookWeight({ ...baseBook, pages: 2 })).toBe(3);
  });

  it("rounds odd page counts up to the next leaf", () => {
    expect(calculateBookWeight({ ...baseBook, pages: 3 })).toBe(5);
  });

  it("adds the paperback binding factor", () => {
    expect(calculateBookWeight(baseBook)).toBe(125);
  });

  it("adds a fixed hardcover allowance", () => {
    expect(calculateBookWeight({ ...baseBook, binding: "hardcover" })).toBe(
      229,
    );
  });

  it("prefers a measured or supplied weight", () => {
    expect(
      calculateBookWeight({
        ...baseBook,
        actualWeightG: 229,
        weightSource: "measured",
      }),
    ).toBe(229);
  });
});

describe("getShelfStage", () => {
  it.each([
    [39, 1],
    [40, 2],
    [59, 2],
    [60, 3],
    [69, 3],
    [70, 3],
    [79, 3],
    [80, 4],
    [84, 4],
    [85, 4],
    [99, 4],
    [100, 4],
  ] as const)("maps %s%% to stage %s", (percentage, stage) => {
    expect(getShelfStage(percentage)).toBe(stage);
  });
});

describe("getReadingWarnings", () => {
  it.each([
    [4, []],
    [5, ["backlogGrowing"]],
    [9, ["backlogGrowing"]],
    [10, ["stopBuying"]],
    [19, ["stopBuying"]],
    [20, ["criticalBacklog"]],
  ] as const)("returns the expected backlog warning for %s books", (count, value) => {
    expect(getReadingWarnings(count, 0)).toEqual(value);
  });

  it("adds a parallel-reading warning at four books", () => {
    expect(getReadingWarnings(0, 4)).toEqual(["parallelReading"]);
  });

  it("asks for one book at a time at six books", () => {
    expect(getReadingWarnings(0, 6)).toEqual(["oneAtATime"]);
  });
});
