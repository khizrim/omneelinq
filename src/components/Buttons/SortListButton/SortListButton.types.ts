import type { ButtonProps } from '@gravity-ui/uikit';

export type SortDirection = 'asc' | 'desc' | 'unset';
export type SortDirectionHandler = (sortDirection: SortDirection) => void;
export type SortListButtonProps = {
  onSort: SortDirectionHandler;
} & ButtonProps;
