export const INTERESTS_PAGE_SIZE = 20;

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
