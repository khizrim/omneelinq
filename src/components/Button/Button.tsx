import React from 'react';

import type { ButtonProps as ButtonComponentProps } from '@gravity-ui/uikit';
import {
  ActionTooltip,
  Button as ButtonComponent,
  Icon,
} from '@gravity-ui/uikit';
import type { SVGIconData } from '@gravity-ui/uikit/build/esm/components/Icon/types';

import type { TooltipTextsProps } from 'src/utils/types';

export type ButtonProps = {
  icon?: SVGIconData;
  tooltip?: TooltipTextsProps;
} & ButtonComponentProps;

export const Button = ({
  icon,
  children,
  tooltip,
  view = 'outlined',
  size = 'l',
  ...props
}: ButtonProps) => {
  const button = (
    <ButtonComponent view={view} size={size} {...props}>
      {icon && <Icon data={icon} />}
      {children}
    </ButtonComponent>
  );

  return tooltip ? (
    <ActionTooltip
      title={tooltip.title}
      description={tooltip.description}
      hotkey={tooltip.hotkey}
      openDelay={1000}
    >
      {button}
    </ActionTooltip>
  ) : (
    button
  );
};
