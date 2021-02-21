import * as React from 'react';

const Content = (props: { children?: any }) => {
  return (
    <div className="app__content">
      {props.children}
    </div>
  );
};

export default React.memo(Content);

