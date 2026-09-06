import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ja } from "@/i18n/dictionaries/ja";
import type { Book, Shelf } from "@/schemas/interests";
import { ReadingTable } from "./ReadingTable";
import { ReadingSummary } from "./ReadingSummary";
import { ReadingWarnings } from "./ReadingWarnings";
import { ShelfLoadIllustration } from "./ShelfLoadIllustration";
import { ShelfStatus } from "./ShelfStatus";

const sampleBook: Book = {
  id: "sample-book",
  title: "すばらしい新世界（新訳版）",
  author: "オルダス・ハクスリー",
  publisher: "早川書房",
  pages: 384,
  format: "bunko",
  binding: "paperback",
  status: "completed",
  category: "Fiction",
  completedAt: "2026-06-02",
  shelfId: "shelf-3",
  actualWeightG: 205,
  weightSource: "measured",
};

const sampleShelf: Shelf = {
  id: "shelf-3",
  label: "3枚目の棚板",
  referenceCapacityKg: 15,
  capacitySource: "user-assumption",
  status: "active",
};

const meta = {
  title: "Interests/Books",
  component: ReadingSummary,
  parameters: { layout: "padded" },
  args: {
    locale: "ja",
    summary: {
      completedCount: 8,
      completedPages: 2356,
      completedWeightKg: 2.3,
      readingCount: 4,
    },
    dictionary: ja.interests.books,
  },
} satisfies Meta<typeof ReadingSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Summary: Story = {};

export const NoWarning: Story = {
  render: () => (
    <ReadingWarnings warnings={[]} dictionary={ja.interests.books} />
  ),
};

export const TooManyConcurrentBooks: Story = {
  render: () => (
    <ReadingWarnings
      warnings={["parallelReading"]}
      dictionary={ja.interests.books}
    />
  ),
};

export const ReadingTableStory: Story = {
  render: () => (
    <ReadingTable
      books={[sampleBook]}
      locale="ja"
      dictionary={ja.interests.books.lists}
      caption={ja.interests.books.lists.completed}
    />
  ),
};

export const NormalShelf: Story = {
  render: () => (
    <ShelfStatus
      shelf={sampleShelf}
      load={{
        completedWeightKg: 2.2,
        destroyedShelfCount: 0,
        damagePercentage: 15,
        stage: 1,
      }}
      dictionary={ja.interests.books.shelf}
    />
  ),
};

export const GettingHeavy: Story = {
  render: () => (
    <ShelfStatus
      shelf={sampleShelf}
      load={{
        completedWeightKg: 23.7,
        destroyedShelfCount: 1,
        damagePercentage: 58,
        stage: 2,
      }}
      dictionary={ja.interests.books.shelf}
    />
  ),
};

export const NearLimit: Story = {
  render: () => (
    <ShelfStatus
      shelf={sampleShelf}
      load={{
        completedWeightKg: 43.1,
        destroyedShelfCount: 2,
        damagePercentage: 87,
        stage: 4,
      }}
      dictionary={ja.interests.books.shelf}
    />
  ),
};

export const FreshShelfAfterExactLoad: Story = {
  render: () => (
    <ShelfStatus
      shelf={sampleShelf}
      load={{
        completedWeightKg: 45,
        destroyedShelfCount: 3,
        damagePercentage: 0,
        stage: 1,
      }}
      dictionary={ja.interests.books.shelf}
    />
  ),
};

export const ShelfIllustrationStages: Story = {
  render: () => (
    <div className="grid gap-4 md:grid-cols-2">
      {([1, 2, 3, 4] as const).map((stage) => (
        <figure key={stage} className="overflow-hidden rounded-2xl">
          <ShelfLoadIllustration stage={stage} />
          <figcaption className="bg-surface px-4 py-2 font-mono text-xs text-muted">
            Stage {stage}
          </figcaption>
        </figure>
      ))}
    </div>
  ),
};
