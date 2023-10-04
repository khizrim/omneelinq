import React from 'react';

import {
  CleanupDuplicatesButton,
  LazyLoadSwitch,
  PasteHtmlSwitch,
} from 'src/components';

import styles from './Options.module.css';

type OptionsProps = {
  lazyLoad: boolean;
  onLazyLoad: () => void;
  pasteHtml: boolean;
  onPasteHtml: () => void;
  onRemoveDuplicates: () => void;
};

export const Options = ({
  lazyLoad,
  onLazyLoad,
  pasteHtml,
  onPasteHtml,
  onRemoveDuplicates,
}: OptionsProps) => (
  <div className={styles.options}>
    <LazyLoadSwitch lazyLoad={lazyLoad} onToggle={onLazyLoad} />
    <PasteHtmlSwitch pasteHtml={pasteHtml} onToggle={onPasteHtml} />
    <CleanupDuplicatesButton onClick={onRemoveDuplicates} />
  </div>
);
