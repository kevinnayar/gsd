import * as React from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { ThunkDispatch } from 'redux-thunk';

import firebase from '../../config/firebase';
import { tasksGetAll } from '../store/tasks/tasksActions';
import { extractError } from '../../utils/baseUtils';
import { UserDef } from '../../types/authTypes';
import { TaskMap } from '../../types/taskTypes';
import { AppReducer, ApiXferStatus } from '../../types/baseTypes';

type HomeProps = {
  db: firebase.firestore.Firestore;
  userDef: null | UserDef;
  tasksMap: null | TaskMap;
  taskAddXferStatus: ApiXferStatus;
  taskUpdateXferStatus: ApiXferStatus;
  taskRemoveXferStatus: ApiXferStatus;
  tasksGetAll: (db: firebase.firestore.Firestore, userId: string) => void;
};

export function HomePage(props: HomeProps) {
  if (!props.userDef) return <Redirect to="/login" />;

  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    try {
      props.tasksGetAll(props.db, props.userDef.userId);
    } catch (e) {
      setError(extractError(e));
    }
  }, [props.userDef]);
  
  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
    </div>
  );
}

function mapStateToProps(state: AppReducer) {
  return {
    db: state.auth.db,
    userDef: state.auth.userDef,
    tasksMap: state.tasks.tasksMap,
    taskAddXferStatus: state.tasks.taskAddXferStatus,
    taskUpdateXferStatus: state.tasks.taskUpdateXferStatus,
    taskRemoveXferStatus: state.tasks.taskRemoveXferStatus,
  };
}

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, any>) {
  return {
    tasksGetAll: (db: firebase.firestore.Firestore, userId: string) => dispatch(tasksGetAll(db, userId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);


