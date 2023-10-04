import React from 'react';

import { Text } from '@gravity-ui/uikit';

import logo from 'src/images/logo.svg';
import { EXTENSION_NAME } from 'src/utils/constants';

import styles from './Logo.module.css';

export const Logo = () => {
  return (
    <div className={styles.container}>
      <img width={24} height={24} src={logo} alt={EXTENSION_NAME} />
      <Text as="h1" variant="header-1" className={styles.title}>
        Omneelinq
      </Text>
    </div>
  );
};
