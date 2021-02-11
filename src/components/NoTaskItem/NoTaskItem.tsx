import * as React from 'react';

export const NoTaskItem = React.memo(() => (
  <div className="task-item task-item--none">
    <p>No current tasks.</p>
    <p>create one</p>
  </div>
));



