import React from 'react';

import { Flex, Icon, spacing, Text } from '@gravity-ui/uikit';

import { Sign } from 'src/components/Sign';
import logo from 'src/images/logo.svg';
import { EXTENSION_NAME } from 'src/utils/constants';

export const Logo = () => {
  return (
    <Flex alignItems={'center'} grow={1} gap={2}>
      <Icon data={logo} size={24} />
      <Flex alignItems={'baseline'} gap={2}>
        <Text as="h1" variant="header-1" className={spacing({ m: 0 })}>
          {EXTENSION_NAME}
        </Text>
        <Sign />
      </Flex>
    </Flex>
  );
};
