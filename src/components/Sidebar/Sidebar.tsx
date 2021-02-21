import * as React from 'react';

function Sidebar(props: { children?: any }) {
  return (
    <div className="app__sidebar">
      {props.children}
    </div>
  );
}

export default React.memo(Sidebar);

