import * as React from 'react';
import Icon from '../Icon/Icon';

function NoneTaskEditor(props: { hasTasks: boolean }) {
  return (
    <div className="none--task-editor">
      <div className="none--task-editor__content">
        <p>to create a new task, add one from the top</p>
        <Icon iconName="north_east" className="arrow-ne" />
      </div>
      {props.hasTasks && (
        <div>
          <p className="none--task-editor__separator">or</p>
          <div className="none--task-editor__content">
            <Icon iconName="west" className="arrow-w" />
            <p>to edit a task, select one from the left</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default React.memo(NoneTaskEditor);



