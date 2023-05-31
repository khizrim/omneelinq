import React from 'react';

import {
  ActionTooltip,
  Button as ButtonComponent,
  Icon,
} from '@gravity-ui/uikit';

import type { SVGIconData } from '@gravity-ui/uikit/build/cjs/components/Icon/types';

type ButtonProps = {
  size?: 's' | 'm' | 'l' | 'xl';
  icon?: SVGIconData;
  disabled?: boolean;
  text: string;
  tooltip?: { [key: string]: string };
  onClick: () => void;
};

export const Button = ({
  size = 'l',
  icon,
  disabled = false,
  text,
  tooltip,
  onClick,
}: ButtonProps) => {
  return tooltip ? (
    <ActionTooltip
      title={tooltip.title}
      description={tooltip.description}
      hotkey={tooltip.hotkey}
    >
      <ButtonComponent size={size} disabled={disabled} onClick={onClick}>
        {icon && <Icon data={icon} />}
        {text}
      </ButtonComponent>
    </ActionTooltip>
  ) : (
    <ButtonComponent size={size} disabled={disabled} onClick={onClick}>
      {icon && <Icon data={icon} />}
      {text}
    </ButtonComponent>
  );
};
