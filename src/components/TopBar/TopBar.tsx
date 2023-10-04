import React from 'react';

import { Bug } from '@gravity-ui/icons';
import { Icon, Link } from '@gravity-ui/uikit';

import { Logo } from '../Logo';

import styles from './TopBar.module.css';

export const TopBar = () => {
  return (
    <div className={styles.topBar}>
      <Logo />
      <Link
        className={styles.report}
        href={
          'mailto:khizrim@khizrim.ru?subject=A new bug discovered in Omneelinq!'
        }
        aria-label={'Report a Bug'}
      >
        <Icon data={Bug} />
      </Link>
    </div>
  );
};
