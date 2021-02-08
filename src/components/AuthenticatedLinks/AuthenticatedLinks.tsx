import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Icon } from '../Icon/Icon';
import { AppReducer } from '../../types/baseTypes';

import { authLogout } from '../../store/auth/authActions';
import { taskAdd, tasksGetAll } from '../../store/tasks/tasksActions';
import { createTask } from '../../utils/baseUtils';

export function AuthenticatedLinks() {
  const { db, auth, userDef } = useSelector((state: AppReducer) => state.auth);
  if (!db || !auth || !userDef) return null;

  const dispatch = useDispatch();

  return (
    <div className="authenticated-links">
      <Link className="authenticated-links__link" to="" onClick={(e) => {
        e.preventDefault();
        const task = {
          ...createTask(userDef.userId),
          name: 'New Task',
        };
        dispatch(taskAdd(db, task))
        dispatch(tasksGetAll(db, userDef.userId));
      }}>
        <Icon iconName="add" className="add-task" />
      </Link>
      <Link className="authenticated-links__link" to="" onClick={() => dispatch(authLogout(auth))}>
        <Icon iconName="lock" className="user-logout" />
      </Link>
      <Link className="authenticated-links__link" to="/me">
        <Icon iconName="person" className="user-profile" />
      </Link>
    </div>
  );
}


