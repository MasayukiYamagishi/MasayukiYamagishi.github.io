"use client";

import { useState } from "react";
import {
  getPaginationState,
  INTERESTS_PAGE_SIZE,
} from "@/lib/interests/pagination";

/**
 * 項目一覧をページ単位に分割して表示状態を管理する
 *
 * @param items ページ分割する項目一覧
 * @param pageSize 1ページに表示する項目数
 * @returns 現在ページの項目とページネーション状態
 */
export function usePagination<T>(
  items: readonly T[],
  pageSize = INTERESTS_PAGE_SIZE,
) {
  const [requestedPage, setRequestedPage] = useState(1);
  const state = getPaginationState(items.length, requestedPage, pageSize);

  return {
    ...state,
    pageItems: items.slice(state.startIndex, state.endIndex),
    setCurrentPage: setRequestedPage,
  };
}
