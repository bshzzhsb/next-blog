import React from 'react';

import { ResetIcon } from './icons';

interface IconProps {
  name: string;
  focusable?: boolean;
}

const Icon: React.FC<IconProps> = ({ name, ...attributes }) => {
  switch (name) {
    case 'reset':
      return <ResetIcon className="icon-reset" />;
  }
  return (
    <svg className={`icon icon-${name}`} aria-hidden="true" {...attributes}>
      <use xlinkHref={`#icon-${name}`}></use>
    </svg>
  );
};

export default Icon;
