import * as React from 'react';

const Loader = () => {
  return (
    <div className="loader">
      <div className="spinner">Loading...</div>
    </div>
  );
};

export default React.memo(Loader);

