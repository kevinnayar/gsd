import * as React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Icon from '../Icon/Icon';
import Modal from '../Modal/Modal';
import { taskUpdate, taskRemove, tasksGetAll } from '../../store/tasks/tasksActions';
import { ITaskItem } from '../../types/taskTypes';
import { AppReducer } from '../../types/baseTypes';

type TaskItemProps = { 
  task: ITaskItem,
  taskIds: string[],
  active: boolean,
};

const TaskItem = (props: TaskItemProps) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userDef } = useSelector((state: AppReducer) => state.auth);
  const [modalVisible, setModalVisibility] = useState(false);

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

  const handleDelete = () => {
    const index = props.taskIds.findIndex(id => id === props.task.taskId);
    let newTaskId = undefined;
    if (index >= 0 && props.taskIds[index + 1]) {
      newTaskId = props.taskIds[index + 1];
    }
    dispatch(taskRemove(props.task.taskId));
    history.push(newTaskId ? `/tasks/${newTaskId}` : '/tasks');
  }

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
          onClick={() => setModalVisibility(true)}
        />
      </div>
      <Modal
        message={`Are you sure you want to delete this task: ${props.task.name}?`}
        visible={modalVisible}
        onSuccess={() => handleDelete()}
        onCancel={() => setModalVisibility(false)}
      />
    </div>
  );
};

export default TaskItem;




