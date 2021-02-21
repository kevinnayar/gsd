import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { AppReducer } from '../../types/baseTypes';
import { createTask } from '../../utils/baseUtils';
import { taskAdd } from '../../store/tasks/tasksActions';

function CreateTaskItem() {
  const { userDef } = useSelector((state: AppReducer) => state.auth);
  if (!userDef) return null;

  const dispatch = useDispatch();
  const history = useHistory();
  
  return (
    <Link className="create-task-item" to="" onClick={(e) => {
      e.preventDefault();
      const task = { ...createTask(userDef.userId), name: 'New Task' };
      dispatch(taskAdd(task));
      history.push(`/tasks/${task.taskId}`);
    }}>
      Create a new task
    </Link>
  );
}

export default React.memo(CreateTaskItem);



