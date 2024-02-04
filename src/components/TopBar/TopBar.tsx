import React from 'react';

import { Flex, Label, spacing } from '@gravity-ui/uikit';

import { BugReport } from 'src/components/BugReport';
import { Logo } from 'src/components/Logo';
import { WhatsNew } from 'src/components/WhatsNew';
import { EXTENSION_VERSION } from 'src/utils/constants';

export const TopBar = () => (
  <Flex
    className={spacing({ pb: 4 })}
    justifyContent={'space-between'}
    alignItems={'center'}
    gap={4}
  >
    <Logo />
    <Label>{EXTENSION_VERSION}</Label>
    <BugReport />
    <WhatsNew />
  </Flex>
);
