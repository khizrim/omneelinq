import React from 'react';

import { Button as ButtonComponent, Icon } from '@gravity-ui/uikit';

import type { SVGIconData } from '@gravity-ui/uikit/build/cjs/components/Icon/types';

type ButtonProps = {
  size?: 's' | 'm' | 'l' | 'xl';
  icon?: SVGIconData;
  text: string;
  onClick: () => void;
};

export const Button = ({ size = 'l', icon, text, onClick }: ButtonProps) => {
  return (
    <ButtonComponent size={size} onClick={onClick}>
      {icon && <Icon data={icon} />}
      {text}
    </ButtonComponent>
  );
};
