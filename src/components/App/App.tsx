import React from 'react';
import { ThemeProvider } from '@gravity-ui/uikit';

import TopBar from '../TopBar';
import Input from '../Input';
import Button from '../Button';

import styles from './App.module.css';

export const App = () => {
  return (
    <ThemeProvider>
      <div className={styles.app}>
        <div className={styles.container}>
          <TopBar />
          <Input
            value={''}
            onChange={() => {
              console.log('hello');
            }}
          />
          <div className={styles.buttons}>
            <Button
              text={'Open All URLs'}
              onClick={() => console.log('Opened')}
            />
            <Button
              text={'Extract URLs'}
              onClick={() => console.log('Extracted')}
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};
