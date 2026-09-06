import { describe, expect, it } from "vitest";
import type { Book } from "@/schemas/interests";
import { calculateBookWeight } from "./calculateBookWeight";
import { calculateReadingSummary } from "./calculateReadingSummary";
import { calculateShelfLoad, getShelfStage } from "./calculateShelfLoad";
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

  it("estimates every volume independently for a combined series row", () => {
    expect(
      calculateBookWeight({
        ...baseBook,
        pages: 5,
        volumes: [
          { label: "1", pages: 2 },
          { label: "2", pages: 3 },
        ],
      }),
    ).toBe(8);
  });
});

describe("calculateReadingSummary", () => {
  it("counts a combined series as one reading-log row", () => {
    const summary = calculateReadingSummary([
      {
        ...baseBook,
        status: "completed",
        pages: 5,
        volumes: [
          { label: "1", pages: 2 },
          { label: "2", pages: 3 },
        ],
      },
    ]);

    expect(summary.completedCount).toBe(1);
    expect(summary.completedPages).toBe(5);
  });

  it("keeps the summary counts aligned with the two visible table statuses", () => {
    const summary = calculateReadingSummary([
      { ...baseBook, id: "completed", status: "completed" },
      { ...baseBook, id: "reading", status: "reading" },
      { ...baseBook, id: "backlog", status: "backlog" },
    ]);

    expect(summary.completedCount).toBe(1);
    expect(summary.readingCount).toBe(1);
    expect(summary).not.toHaveProperty("backlogCount");
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

describe("calculateShelfLoad", () => {
  const shelf = {
    id: "shelf-1",
    label: "1枚目の棚板",
    referenceCapacityKg: 15,
    capacitySource: "user-assumption",
    status: "active",
  } as const;

  it("converts full 15 kg loads into broken shelves and keeps the remainder as damage", () => {
    const load = calculateShelfLoad(shelf, [
      {
        ...baseBook,
        status: "completed",
        actualWeightG: 37_500,
        weightSource: "measured",
      },
    ]);

    expect(load).toEqual({
      completedWeightKg: 37.5,
      destroyedShelfCount: 2,
      damagePercentage: 50,
      stage: 2,
    });
  });

  it("starts the next shelf at zero damage on an exact multiple of 15 kg", () => {
    const load = calculateShelfLoad(shelf, [
      {
        ...baseBook,
        status: "completed",
        actualWeightG: 30_000,
        weightSource: "measured",
      },
    ]);

    expect(load.destroyedShelfCount).toBe(2);
    expect(load.damagePercentage).toBe(0);
    expect(load.stage).toBe(1);
  });

  it("does not include unfinished books in shelf damage", () => {
    const load = calculateShelfLoad(shelf, [
      {
        ...baseBook,
        status: "backlog",
        actualWeightG: 30_000,
        weightSource: "measured",
      },
    ]);

    expect(load.completedWeightKg).toBe(0);
    expect(load.destroyedShelfCount).toBe(0);
    expect(load.damagePercentage).toBe(0);
  });
});

describe("getReadingWarnings", () => {
  it.each([
    [0, []],
    [1, []],
    [2, ["parallelReading"]],
    [6, ["parallelReading"]],
  ] as const)("returns the expected warning for %s concurrent books", (count, value) => {
    expect(getReadingWarnings(count)).toEqual(value);
  });
});
