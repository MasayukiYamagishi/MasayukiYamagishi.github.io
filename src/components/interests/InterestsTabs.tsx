"use client";

import {
  type KeyboardEvent,
  type ReactNode,
  useRef,
  useState,
} from "react";

type TabId = "books" | "movies";

type InterestsTabsProps = {
  label: string;
  labels: Record<TabId, string>;
  booksPanel: ReactNode;
  moviesPanel: ReactNode;
};

const tabIds: readonly TabId[] = ["books", "movies"];

/**
 * 読書と映画の表示を切り替えるタブを表示する
 *
 * @param InterestsTabsProps props
 * @returns 趣味カテゴリ切り替えタブのJSX
 */
export function InterestsTabs({
  label,
  labels,
  booksPanel,
  moviesPanel,
}: InterestsTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("books");
  const tabRefs = useRef<Record<TabId, HTMLButtonElement | null>>({
    books: null,
    movies: null,
  });

  /**
   * 指定したタブを選択してフォーカスを移動する
   *
   * @param tabId 選択するタブid
   * @returns 戻り値なし
   */
  function selectAndFocus(tabId: TabId) {
    setActiveTab(tabId);
    tabRefs.current[tabId]?.focus();
  }

  /**
   * キーボード操作に応じて選択中のタブを移動する
   *
   * @param event タブで発生したキーボードイベント
   * @returns 戻り値なし
   */
  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const currentIndex = tabIds.indexOf(activeTab);
    let nextTab: TabId | undefined;

    if (event.key === "ArrowRight") {
      nextTab = tabIds[(currentIndex + 1) % tabIds.length];
    } else if (event.key === "ArrowLeft") {
      nextTab = tabIds[(currentIndex - 1 + tabIds.length) % tabIds.length];
    } else if (event.key === "Home") {
      nextTab = tabIds[0];
    } else if (event.key === "End") {
      nextTab = tabIds[tabIds.length - 1];
    }

    if (nextTab) {
      event.preventDefault();
      selectAndFocus(nextTab);
    }
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label={label}
        className="sticky top-20 z-20 mb-10 inline-flex rounded-xl border border-border bg-background/90 p-1 shadow-sm backdrop-blur-sm"
      >
        {tabIds.map((tabId) => {
          const selected = activeTab === tabId;

          return (
            <button
              key={tabId}
              ref={(element) => {
                tabRefs.current[tabId] = element;
              }}
              id={`${tabId}-tab`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${tabId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveTab(tabId)}
              onKeyDown={handleKeyDown}
              className={[
                "min-w-28 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors motion-reduce:transition-none",
                selected
                  ? "bg-foreground text-background"
                  : "text-muted hover:bg-surface-hover hover:text-foreground",
              ].join(" ")}
            >
              {labels[tabId]}
            </button>
          );
        })}
      </div>

      <div
        id="books-panel"
        role="tabpanel"
        aria-labelledby="books-tab"
        tabIndex={0}
        hidden={activeTab !== "books"}
      >
        {booksPanel}
      </div>
      <div
        id="movies-panel"
        role="tabpanel"
        aria-labelledby="movies-tab"
        tabIndex={0}
        hidden={activeTab !== "movies"}
      >
        {moviesPanel}
      </div>
    </div>
  );
}
