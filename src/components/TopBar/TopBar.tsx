import React from 'react';

import Logo from '../Logo';

import styles from './TopBar.module.css';
import { Label, Link } from '@gravity-ui/uikit';

export const TopBar = () => {
  return (
    <div className={styles.topBar}>
      <Logo />
      <Label theme={'info'}>Beta 0.1</Label>
      <Link href={'https://khizrim.ru'} target="_blank">
        by Khizrim
      </Link>
    </div>
  );
};
