import React from 'react';

import { Flex, Icon, spacing, Text } from '@gravity-ui/uikit';

import logo from 'src/images/logo.svg';
import { EXTENSION_NAME } from 'src/utils/constants';

export const Logo = () => {
  return (
    <Flex space={4} alignItems={'center'} grow={1}>
      <Icon data={logo} size={24} />
      <Text as="h1" variant="header-1" className={spacing({ m: 0 })}>
        {EXTENSION_NAME}
      </Text>
    </Flex>
  );
};
