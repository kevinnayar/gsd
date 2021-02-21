import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Icon from '../Icon/Icon';
import { AppReducer } from '../../types/baseTypes';
import { authLogout } from '../../store/auth/authActions';

function AuthedLinks() {
  const { userDef } = useSelector((state: AppReducer) => state.auth);
  if (!userDef) return null;

  const dispatch = useDispatch();

  return (
    <div className="authed-links">
      <Link
        className="authed-links__link"
        to="/tasks"
      >
        <Icon iconName="list" className="user-tasks" />
        <p>Tasks</p>
      </Link>

      <Link
        className="authed-links__link"
        to="/me"
      >
        <Icon iconName="person" className="user-profile" />
        <p>Profile</p>
      </Link>

      <Link
        className="authed-links__link"
        to=""
        onClick={(e) => {
          e.preventDefault();
          dispatch(authLogout());
        }}
      >
        <Icon iconName="lock" className="user-logout" />
        <p>Logout</p>
      </Link>
    </div>
  );
}

export default React.memo(AuthedLinks);



