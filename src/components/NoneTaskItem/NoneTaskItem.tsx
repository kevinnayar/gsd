import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Icon from '../Icon/Icon';
import { AppReducer } from '../../types/baseTypes';
import { createTask } from '../../utils/baseUtils';
import { taskAdd } from '../../store/tasks/tasksActions';

const NoneTaskItem = () => {
  const { userDef } = useSelector((state: AppReducer) => state.auth);
  if (!userDef) return null;

  const dispatch = useDispatch();
  
  return (
    <div className="none--task-item">
      <Link className="none--task-item__link" to="" onClick={(e) => {
        e.preventDefault();
        const task = { ...createTask(userDef.userId), name: 'New Task' };
        dispatch(taskAdd(task));
      }}>
        <Icon iconName="add" className="add-task" />
        <p>Create a new task</p>
      </Link>
    </div>
  );
};

export default React.memo(NoneTaskItem);



