import React from 'react';

import type {
  LazyLoadSwitchProps,
  PasteHtmlSwitchProps,
  RemoveDuplicatesButtonsProps,
  SortListButtonProps,
} from 'src/components';
import {
  RemoveDuplicatesButton,
  LazyLoadSwitch,
  PasteHtmlSwitch,
  SortListButton,
} from 'src/components';

import styles from './Options.module.css';

type OptionsProps = LazyLoadSwitchProps &
  PasteHtmlSwitchProps &
  SortListButtonProps &
  RemoveDuplicatesButtonsProps;

export const Options = ({
  lazyLoad,
  onLazyLoad,
  pasteHtml,
  onPasteHtml,
  isEmptyList,
  onRemoveDuplicates,
  onSort,
}: OptionsProps) => (
  <section className={styles.options}>
    <menu className={styles.config}>
      <LazyLoadSwitch lazyLoad={lazyLoad} onLazyLoad={onLazyLoad} />
      <PasteHtmlSwitch pasteHtml={pasteHtml} onPasteHtml={onPasteHtml} />
    </menu>
    <menu className={styles.actions}>
      <RemoveDuplicatesButton
        isEmptyList={isEmptyList}
        onRemoveDuplicates={onRemoveDuplicates}
      />
      <SortListButton isEmptyList={isEmptyList} onSort={onSort} />
    </menu>
  </section>
);
