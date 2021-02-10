import * as React from 'react';

type IconProps = {
  iconName: string;
  className: string;
  onClick?: (...args: any[]) => void;
};

export const Icon = React.memo((props: IconProps) => {
  return (
    <div className={`icon icon--${props.className}`} onClick={props.onClick}>
      <i className="material-icons">{props.iconName}</i>
    </div>
  );
});

