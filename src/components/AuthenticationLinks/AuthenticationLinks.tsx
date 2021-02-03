import * as React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Icon } from '../Icon/Icon';
import { createTask } from '../../utils/baseUtils';
import { UserDef } from '../../types/authTypes';
import { ITaskItem } from '../../types/taskTypes';

type AuthenticationLinksProps = {
  userDef: null | UserDef;
  logout: () => void;
  addTask: (task: ITaskItem) => void;
};

export function AuthenticationLinks(props: AuthenticationLinksProps) {
  const history = useHistory();

  return (
    <div className="authentication-links">
      {props.userDef
        ? (
          <>
            <Link
              className="authentication-links__link"
              to=""
              onClick={(e: any) => {
                e.preventDefault();
                const task = createTask(props.userDef.userId);
                props.addTask(task);
                history.push(`tasks/${task.taskId}`);
              }}
            >
              <Icon iconName="add" className="add-task" />
              <p>Add Task</p>
            </Link>
            <Link className="authentication-links__link" to="" onClick={props.logout}>
              <Icon iconName="lock" className="user-logout" />
              <p>Logout - <span>{props.userDef.displayName}</span></p>
            </Link>
          </>
        ): (
          <>
            <Link className="authentication-links__link" to="/login">
              <Icon iconName="lock" className="user-login" />
              <p>Login</p>
            </Link>
            <Link className="authentication-links__link" to="/signup">
              <Icon iconName="person_add" className="user-register" />
              <p>Signup</p>
            </Link>
          </>
        )}
    </div>
  );
}


