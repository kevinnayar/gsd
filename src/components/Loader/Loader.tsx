import * as React from 'react';

function Loader() {
  return (
    <div className="loader">
      <div className="spinner">Loading...</div>
    </div>
  );
}

export default React.memo(Loader);

