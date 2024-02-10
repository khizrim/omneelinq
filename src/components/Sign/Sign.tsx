import React from 'react';

import { Link, Text } from '@gravity-ui/uikit';

import { MAINTAINER_NICKNAME, MAINTAINER_URL } from 'src/utils/constants';

export const Sign = () => (
  <Text variant={'caption-2'} color={'secondary'}>
    by {''}
    <Link href={MAINTAINER_URL} target={'_blank'} view={'secondary'}>
      {MAINTAINER_NICKNAME}
    </Link>
  </Text>
);
