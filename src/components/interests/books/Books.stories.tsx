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
      backlogCount: 12,
    },
    destroyedShelfCount: 2,
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

export const BacklogGrowing: Story = {
  render: () => (
    <ReadingWarnings
      warnings={["backlogGrowing"]}
      dictionary={ja.interests.books}
    />
  ),
};

export const StopBuyingBooks: Story = {
  render: () => (
    <ReadingWarnings
      warnings={["stopBuying"]}
      dictionary={ja.interests.books}
    />
  ),
};

export const CriticalBacklog: Story = {
  render: () => (
    <ReadingWarnings
      warnings={["criticalBacklog"]}
      dictionary={ja.interests.books}
    />
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
      locale="ja"
      shelf={sampleShelf}
      destroyedShelfCount={2}
      load={{
        currentWeightKg: 2.2,
        loadPercentage: 15,
        stage: 1,
        exceeded: false,
      }}
      dictionary={ja.interests.books.shelf}
    />
  ),
};

export const GettingHeavy: Story = {
  render: () => (
    <ShelfStatus
      locale="ja"
      shelf={sampleShelf}
      destroyedShelfCount={2}
      load={{
        currentWeightKg: 8.7,
        loadPercentage: 58,
        stage: 2,
        exceeded: false,
      }}
      dictionary={ja.interests.books.shelf}
    />
  ),
};

export const NearLimit: Story = {
  render: () => (
    <ShelfStatus
      locale="ja"
      shelf={sampleShelf}
      destroyedShelfCount={2}
      load={{
        currentWeightKg: 13.1,
        loadPercentage: 87,
        stage: 4,
        exceeded: false,
      }}
      dictionary={ja.interests.books.shelf}
    />
  ),
};

export const OverLine: Story = {
  render: () => (
    <ShelfStatus
      locale="ja"
      shelf={sampleShelf}
      destroyedShelfCount={2}
      load={{
        currentWeightKg: 15.8,
        loadPercentage: 105,
        stage: 4,
        exceeded: true,
      }}
      dictionary={ja.interests.books.shelf}
    />
  ),
};

export const Retired: Story = {
  render: () => (
    <ShelfStatus
      locale="ja"
      shelf={{
        ...sampleShelf,
        id: "shelf-2",
        label: "2枚目の棚板",
        status: "retired",
        retiredReason: "たわみが戻らなくなったため",
      }}
      destroyedShelfCount={2}
      load={{
        currentWeightKg: 0,
        loadPercentage: 0,
        stage: 1,
        exceeded: false,
      }}
      dictionary={ja.interests.books.shelf}
    />
  ),
};

export const ShelfIllustration: Story = {
  render: () => <ShelfLoadIllustration stage={4} />,
};
