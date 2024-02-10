import React from 'react';

import { Star } from '@gravity-ui/icons';
import { Flex, Icon, Text, Link } from '@gravity-ui/uikit';

import {
  CHROME_WEB_STORE_URL,
  EXTENSION_NAME,
  EXTENSION_STORE_ID,
  RATE_LINK_TEXTS,
} from 'src/utils/constants';

export const Review = () => {
  const href = `${CHROME_WEB_STORE_URL}/detail/${EXTENSION_NAME}/${EXTENSION_STORE_ID}/reviews`;

  return (
    <Link view={'primary'} href={href} target={'_blank'}>
      <Flex
        spacing={{ px: 2 }}
        gap={2}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Icon data={Star} />
        <Text>{RATE_LINK_TEXTS.title}</Text>
      </Flex>
    </Link>
  );
};
