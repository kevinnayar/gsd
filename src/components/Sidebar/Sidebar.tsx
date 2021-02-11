import * as React from 'react';

export const Sidebar = React.memo((props: { children?: any }) => {
  return (
    <div className="app__sidebar">
      {props.children}
    </div>
  );
});

