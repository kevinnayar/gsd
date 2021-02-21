import * as React from 'react';

function Content(props: { children?: any }) {
  return (
    <div className="app__content">
      {props.children}
    </div>
  );
}

export default React.memo(Content);

