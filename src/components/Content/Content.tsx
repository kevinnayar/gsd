import * as React from 'react';

export const Content = React.memo((props: { children?: any }) => {
  return (
    <div className="app__content">
      {props.children}
    </div>
  );
});

