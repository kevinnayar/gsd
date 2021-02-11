import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon } from '../Icon/Icon';
import { AppReducer } from '../../types/baseTypes';
import { createTask } from '../../utils/baseUtils';
import { taskAdd } from '../../store/tasks/tasksActions';
import { authLogout } from '../../store/auth/authActions';

export const AuthedLinks = React.memo(() => {
  const { userDef } = useSelector((state: AppReducer) => state.auth);
  if (!userDef) return null;

  const dispatch = useDispatch();

  return (
    <div className="authed-links">
      <Link className="authed-links__link" to="" onClick={(e) => {
        e.preventDefault();
        const task = { ...createTask(userDef.userId), name: 'New Task' };
        dispatch(taskAdd(task));
      }}>
        <Icon iconName="add" className="add-task" />
      </Link>
      <Link className="authed-links__link" to="" onClick={() => dispatch(authLogout())}>
        <Icon iconName="lock" className="user-logout" />
      </Link>
      <Link className="authed-links__link" to="/me">
        <Icon iconName="person" className="user-profile" />
      </Link>
    </div>
  );
});



