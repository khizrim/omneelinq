import React from 'react';

import { Flex, spacing } from '@gravity-ui/uikit';

import { BugReport } from 'src/components/BugReport';
import { Logo } from 'src/components/Logo';
import { Review } from 'src/components/Review';
import { WhatsNew } from 'src/components/WhatsNew';

export const TopBar = () => (
  <Flex
    className={spacing({ pb: 2 })}
    justifyContent={'space-between'}
    alignItems={'center'}
    gap={2}
  >
    <Logo />
    <Review />
    <BugReport />
    <WhatsNew />
  </Flex>
);
