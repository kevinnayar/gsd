import * as React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { AuthenticatedLinks } from '../components/AuthenticatedLinks/AuthenticatedLinks';
import { TaskDocEditor } from '../components/TaskDocEditor/TaskDocEditor';

import { authSetRedirectPathname } from '../store/auth/authActions';
import { tasksGetAll } from '../store/tasks/tasksActions';
import { AppReducer } from '../types/baseTypes';

export default function MainPage() {
  const dispatch = useDispatch();
  const { db, userDef, redirectPathname } = useSelector((state: AppReducer) => state.auth);
  const { taskMap } = useSelector((state: AppReducer) => state.tasks);
  const taskId = location.pathname.includes('/tasks/') ? location.pathname.replace('/tasks/', '') : '';

  useEffect(() => {
    if (userDef && redirectPathname) {
      dispatch(authSetRedirectPathname(null));
    }
  }, [userDef]);

  useEffect(() => {
    if (userDef && !taskMap) {
      dispatch(tasksGetAll(db, userDef.userId));
    }
  }, [taskMap]);

  return (
    <div className="main">
      <AuthenticatedLinks />
      <TaskDocEditor taskId={taskId} />
    </div>
  );
}

