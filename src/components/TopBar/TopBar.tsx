import React from 'react';

import { Bug } from '@gravity-ui/icons';
import { Icon, Link } from '@gravity-ui/uikit';

import { Logo } from 'src/components/Logo';
import { BUG_REPORT_TEXTS, MAINTAINER_EMAIL } from 'src/utils/constants';

import styles from './TopBar.module.css';

export const TopBar = () => {
  return (
    <div className={styles.topBar}>
      <Logo />
      <Link
        className={styles.report}
        href={`mailto:${MAINTAINER_EMAIL}?subject=${BUG_REPORT_TEXTS.subject}`}
        aria-label={BUG_REPORT_TEXTS.label}
      >
        <Icon data={Bug} />
      </Link>
    </div>
  );
};
