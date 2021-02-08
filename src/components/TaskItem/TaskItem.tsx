import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Icon } from '../Icon/Icon';
import { taskUpdate, taskRemove, tasksGetAll } from '../../store/tasks/tasksActions';
import { ITaskItem } from '../../types/taskTypes';
import { AppReducer } from '../../types/baseTypes';

export function TaskItem(props: { task: ITaskItem }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { db, userDef } = useSelector((state: AppReducer) => state.auth);

  const handleSelect = () => {
    if (userDef) {
      dispatch(tasksGetAll(db, userDef.userId));
      history.push(`/tasks/${props.task.taskId}`);
    }
  };

  const handleToggleCompletion = () => {
    const task = {
      ...props.task,
      completed: !props.task.completed
    };
    dispatch(taskUpdate(db, task));
  };

  const handleDelete = () => dispatch(taskRemove(db, props.task.taskId));

  return (
    <div className={`task-item task-item--${props.task.completed ? 'complete' : 'incomplete'}`}>
      <p className="task-item__name" onClick={handleSelect}>{props.task.name}</p>
      <div className="task-item__actions">
        <Icon
          iconName={!props.task.completed ? "done" : "clear"}
          className="complete-task"
          onClick={handleToggleCompletion}
        />
        <Icon
          iconName="delete"
          className="delete-task"
          onClick={handleDelete}
        />
      </div>
    </div>
  );
}

