import React from 'react';

import { LazyLoadSwitch } from '../LazyLoadSwitch';
import { PasteHtmlSwitch } from '../PasteHtmlSwitch';

import styles from './Options.module.css';

export const Options = (props: {
  lazyLoad: boolean;
  onToggle: () => void;
  pasteHtml: boolean;
  onToggle1: () => void;
}) => (
  <div className={styles.options}>
    <LazyLoadSwitch lazyLoad={props.lazyLoad} onToggle={props.onToggle} />
    <PasteHtmlSwitch pasteHtml={props.pasteHtml} onToggle={props.onToggle1} />
  </div>
);
