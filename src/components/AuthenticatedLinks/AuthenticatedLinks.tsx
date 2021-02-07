import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Icon } from '../Icon/Icon';
import { AppReducer } from '../../types/baseTypes';

import { authLogout } from '../../store/auth/authActions';
import { taskAdd } from '../../store/tasks/tasksActions';
import { createTask } from '../../utils/baseUtils';


export function AuthenticatedLinks() {  
  const { db, auth, userDef } = useSelector((state: AppReducer) => state.auth);
  if (!db || !auth || !userDef) return null;

  const dispatch = useDispatch();

  return (
    <div className="authenticated-links">
      <Link className="authenticated-links__link" to="" onClick={() => {
        const task = createTask(userDef.userId);
        dispatch(taskAdd(db, task))}
      }>
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


