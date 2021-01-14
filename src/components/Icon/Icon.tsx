import * as React from 'react';

type IconProps = {
  iconName: string;
  className: string;
  onClick: (...args: any[]) => void;
};

export function Icon(props: IconProps) {
  return (
    <i className={`material-icons icon icon--${props.className}`} onClick={props.onClick}>
      {props.iconName}
    </i>
  );
}

