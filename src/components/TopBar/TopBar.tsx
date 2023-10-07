import React from 'react';

import { Flex, Label } from '@gravity-ui/uikit';

import { BugReport } from 'src/components/BugReport';
import { Logo } from 'src/components/Logo';
import { EXTENSION_VERSION } from 'src/utils/constants';

export const TopBar = () => (
  <Flex justifyContent={'space-between'} alignItems={'center'} gap={4}>
    <Logo />
    <Label>{EXTENSION_VERSION}</Label>
    <BugReport />
  </Flex>
);
