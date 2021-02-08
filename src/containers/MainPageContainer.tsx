import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import { AuthenticatedLinks } from '../components/AuthenticatedLinks/AuthenticatedLinks';
import { TaskDocEditor } from '../components/TaskDocEditor/TaskDocEditor';

import { authSetRedirectPathname } from '../store/auth/authActions';
import { tasksGetAll } from '../store/tasks/tasksActions';
import { taskDocGet } from '../store/taskDocs/taskDocsActions';
import { AppReducer } from '../types/baseTypes';

export default function MainPage(props: RouteComponentProps) {
  const dispatch = useDispatch();
  const { db, userDef, redirectPathname } = useSelector((state: AppReducer) => state.auth);
  const { taskMap, taskGetAllXferStatus } = useSelector((state: AppReducer) => state.tasks);
  const { blobs, taskDocGetXferStatus } = useSelector((state: AppReducer) => state.taskDocs);

  // @ts-ignore
  const taskId = props.match.params && props.match.params.id !== undefined ? props.match.params.id : undefined;

  const [task, setTask] = useState(null);
  const [taskDoc, setTaskDoc] = useState(null);

  useEffect(() => {
    if (userDef && redirectPathname) dispatch(authSetRedirectPathname(null));
  }, [userDef]);

  useEffect(() => {
    if (userDef) dispatch(tasksGetAll(db, userDef.userId));
    if (userDef && taskId) dispatch(taskDocGet(db, taskId));
  }, [taskId]);

  useEffect(() => {
    if (taskGetAllXferStatus.succeeded && taskMap && taskMap[taskId]) setTask(taskMap[taskId]);
  }, [taskGetAllXferStatus]);

  useEffect(() => {
    if (taskDocGetXferStatus.succeeded && blobs && blobs[taskId]) setTaskDoc(blobs[taskId]);
  }, [taskDocGetXferStatus]);

  return (
    <div className="main">
      <AuthenticatedLinks />
      {task && taskDoc && <TaskDocEditor task={task} taskDoc={taskDoc} />}
    </div>
  );
}


