import type { SortDirection } from 'src/components';

export const sortUrls = (urlsArray: string[], sortDirection: SortDirection) =>
  sortDirection === 'asc' ? urlsArray.sort() : urlsArray.sort().reverse();
