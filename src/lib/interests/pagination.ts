export const INTERESTS_PAGE_SIZE = 20;

/**
 * 項目数と要求ページからページネーションの状態を計算する
 *
 * @param totalItems 全項目数
 * @param requestedPage 要求されたページ番号
 * @param pageSize 1ページに表示する項目数
 * @returns 現在ページと表示範囲を含むページネーション状態
 */
export function getPaginationState(
  totalItems: number,
  requestedPage: number,
  pageSize = INTERESTS_PAGE_SIZE,
) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.min(
    Math.max(1, Math.trunc(requestedPage)),
    totalPages,
  );
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);

  return {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    startItem: totalItems === 0 ? 0 : startIndex + 1,
    endItem: endIndex,
  };
}
