import * as React from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import firebase from '../../config/firebase';
import { Loader } from '../components/Loader/Loader';
import { TaskDocEditor } from '../components/TaskDocEditor/TaskDocEditor';
import { TaskList } from '../components/TaskList/TaskList';
import { tasksGetAll, taskAdd, taskUpdate, taskRemove } from '../store/tasks/tasksActions';
import { taskDocGet, taskDocUpdate } from '../store/taskDocs/taskDocsActions';
import { extractError } from '../utils/baseUtils';
import { AppReducer } from '../types/baseTypes';
import { UserDef } from '../types/authTypes';
import { TaskMap, ITaskItem } from '../types/taskTypes';
import { TaskDoc, TaskDocMap } from '../types/taskDocTypes';

type HomeProps = {
  db: firebase.firestore.Firestore;
  userDef: null | UserDef;
  taskMap: null | TaskMap;
  taskDocBlobs: null | TaskDocMap,
  getAllTasks: (db: firebase.firestore.Firestore, userId: string) => void;
  addTask: (db: firebase.firestore.Firestore, task: ITaskItem) => void;
  updateTask: (db: firebase.firestore.Firestore, task: ITaskItem) => void;
  removeTask: (db: firebase.firestore.Firestore, taskId: string) => void;
  getTaskDoc: (db: firebase.firestore.Firestore, userId: string, taskId: string) => void;
  updateTaskDoc: (db: firebase.firestore.Firestore, taskDoc: TaskDoc) => void;
};

export function HomePage(props: HomeProps) {
  const [error, setError] = useState<null | string>(null);
  const [task, setTask] = useState<null | ITaskItem>(null);
  const [taskDoc, setTaskDoc] = useState<null | TaskDoc>(null);

  useEffect(() => {
    try {
      if (props.userDef) props.getAllTasks(props.db, props.userDef.userId);
    } catch (e) {
      setError(extractError(e));
    }
  }, [props.userDef]);

  const getTaskDocBlob = (taskId: string) => {
    const task = props.taskMap[taskId];
    if (task) {
      setTask(task);
      props.getTaskDoc(props.db, props.userDef.userId, task.taskId);
    }
  }

  useEffect(() => {
    try {
      if (task && props.taskDocBlobs && props.taskDocBlobs[task.taskId] !== undefined) {
        setTaskDoc(props.taskDocBlobs[task.taskId]);
      }
    } catch (e) {
      setError(extractError(e));
    }
  }, [task, props.taskDocBlobs]);

  if (!props.userDef || !props.taskMap) return <Loader />;

  return (
    <div className="main">
      {error && <p className="main__error">{error}</p>}
      <div className="main__nav">
        {props.taskMap && (
          <TaskList
            taskMap={props.taskMap}
            getTaskDocBlob={getTaskDocBlob}
            updateTask={(task) => props.updateTask(props.db, task)}
            deleteTask={(taskId) => props.removeTask(props.db, taskId)}
          />
        )}
      </div>
      <div className="main__content">
        {task && taskDoc && (
          <TaskDocEditor
            taskName={task.name}
            taskDoc={taskDoc}
            updateTaskDoc={(taskDoc) => props.updateTaskDoc(props.db, taskDoc)} />
        )}
      </div>
    </div>
  );
}

function mapStateToProps(state: AppReducer) {
  return {
    db: state.auth.db,
    userDef: state.auth.userDef,
    taskMap: state.tasks.taskMap,
    taskDocBlobs: state.taskDocs.blobs,
  };
}

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, any>) {
  return {
    getAllTasks: (db: firebase.firestore.Firestore, userId: string) => dispatch(tasksGetAll(db, userId)),
    addTask: (db: firebase.firestore.Firestore, task: ITaskItem) => dispatch(taskAdd(db, task)),
    updateTask: (db: firebase.firestore.Firestore, task: ITaskItem) => dispatch(taskUpdate(db, task)),
    removeTask: (db: firebase.firestore.Firestore, taskId: string) => dispatch(taskRemove(db, taskId)),
    getTaskDoc: (db: firebase.firestore.Firestore, userId: string, taskId: string) => dispatch(taskDocGet(db, userId, taskId)),
    updateTaskDoc: (db: firebase.firestore.Firestore, taskDoc: TaskDoc) => dispatch(taskDocUpdate(db, taskDoc)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);


