import React from 'react';
import { Text } from '@gravity-ui/uikit';

import logo from '../../images/logo.svg';

import styles from './Logo.module.css';

export const Logo = () => {
  return (
    <div className={styles.container}>
      <img width={24} height={24} src={logo} alt="Omneelinq" />
      <Text as="h1" variant="header-1" className={styles.title}>
        Omneelinq
      </Text>
    </div>
  );
};
