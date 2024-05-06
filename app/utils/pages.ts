export function calculatePage(currentPage: string, allPages: number) {
  const currentPageNum = Number(currentPage);
  const prev = currentPageNum - 1 >= 1 ? String(currentPageNum - 1) : null;
  const next =
    currentPageNum + 1 <= allPages ? String(currentPageNum + 1) : null;
  const first = currentPageNum !== 1 ? "1" : null;
  const last = currentPageNum !== allPages ? String(allPages) : null;
  return {
    first: first,
    prev: prev,
    current: currentPage,
    next: next,
    last: last,
  };
}
