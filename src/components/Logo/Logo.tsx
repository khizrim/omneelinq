import React from 'react';
import { Text } from '@gravity-ui/uikit';

import logo from '../../images/logo.svg';

import styles from './Logo.module.css';

export const Logo = () => {
  return (
    <div className={styles.container}>
      <img width={32} height={32} src={logo} alt="Omneelinq" />
      <Text as="h1" variant="header-1">
        Omneelinq
      </Text>
    </div>
  );
};
