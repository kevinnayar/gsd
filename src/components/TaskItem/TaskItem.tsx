import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Icon } from '../Icon/Icon';
import { taskUpdate, taskRemove, tasksGetAll } from '../../store/tasks/tasksActions';
import { ITaskItem } from '../../types/taskTypes';
import { AppReducer } from '../../types/baseTypes';

export const TaskItem = React.memo((props: { task: ITaskItem, active: boolean }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userDef } = useSelector((state: AppReducer) => state.auth);

  const handleSelect = () => {
    if (userDef) {
      dispatch(tasksGetAll(userDef.userId));
      history.push(`/tasks/${props.task.taskId}`);
    }
  };

  const handleToggleCompletion = () => {
    const task = {
      ...props.task,
      completed: !props.task.completed
    };
    dispatch(taskUpdate(task));
  };

  const handleDelete = () => dispatch(taskRemove(props.task.taskId));

  return (
    <div className={`task-item task-item--${props.task.completed ? 'complete' : 'incomplete'} ${props.active ? 'task-item--active' : ''}`}>
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
});



