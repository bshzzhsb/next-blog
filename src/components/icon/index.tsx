import React from 'react';

interface IconProps {
  name: string;
  focusable?: boolean;
}

const Icon: React.FC<IconProps> = ({ name, ...attributes }) => {
  return (
    <svg className={`icon icon-${name}`} aria-hidden="true" {...attributes}>
      <use xlinkHref={`#icon-${name}`}></use>
    </svg>
  );
};

export default Icon;
