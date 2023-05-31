import React from 'react';
import { Label, Link } from '@gravity-ui/uikit';

import Logo from '../Logo';

import styles from './TopBar.module.css';

export const TopBar = () => {
  return (
    <div className={styles.topBar}>
      <Logo />
      <Label theme={'success'}>0.1.0 Beta</Label>
      <Link href={'https://khizrim.ru'} target="_blank">
        by khizrim
      </Link>
    </div>
  );
};
