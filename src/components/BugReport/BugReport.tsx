import React from 'react';

import { Bug } from '@gravity-ui/icons';
import { Flex, Icon, Link } from '@gravity-ui/uikit';

import { BUG_REPORT_TEXTS, MAINTAINER_EMAIL } from 'src/utils/constants';

export const BugReport = () => {
  const mailto = `mailto:${MAINTAINER_EMAIL}?subject=${BUG_REPORT_TEXTS.subject}`;

  return (
    <Link view={'primary'} href={mailto} aria-label={BUG_REPORT_TEXTS.label}>
      <Flex spacing={{ px: 2 }} justifyContent={'center'} alignItems={'center'}>
        <Icon data={Bug} />
      </Flex>
    </Link>
  );
};
