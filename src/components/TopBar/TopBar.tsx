import React from 'react';

import Logo from '../Logo';
import LazyLoadSwitch from '../LazyLoadSwitch';

import type { LazyLoadSwitchProps } from '../LazyLoadSwitch/LazyLoadSwitch';

import styles from './TopBar.module.css';

type TopBarProps = LazyLoadSwitchProps;

export const TopBar = ({ lazyLoad, onToggle }: TopBarProps) => {
  return (
    <div className={styles.topBar}>
      <Logo />
      <LazyLoadSwitch lazyLoad={lazyLoad} onToggle={onToggle} />
    </div>
  );
};
