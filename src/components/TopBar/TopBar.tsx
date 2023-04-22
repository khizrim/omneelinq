import React from 'react';

import Logo from '../Logo';
import LazyLoadSwitch from '../LazyLoadSwitch';

import styles from './TopBar.module.css';

export const TopBar = () => {
  return (
    <div className={styles.topBar}>
      <Logo />
      <LazyLoadSwitch
        lazyLoad={true}
        onToggle={() => {
          console.log('toggled');
        }}
      />
    </div>
  );
};
