import * as React from 'react';

const Sidebar = (props: { children?: any }) => {
  return (
    <div className="app__sidebar">
      {props.children}
    </div>
  );
};

export default React.memo(Sidebar);

