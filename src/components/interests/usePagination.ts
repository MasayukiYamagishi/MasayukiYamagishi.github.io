"use client";

import { useState } from "react";
import {
  getPaginationState,
  INTERESTS_PAGE_SIZE,
} from "@/lib/interests/pagination";

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
