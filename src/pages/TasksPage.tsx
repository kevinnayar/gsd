import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';

import PrivatePage from './PrivatePage';
import { TaskList } from '../components/TaskList/TaskList';
import { TaskNameEditor } from '../components/TaskNameEditor/TaskNameEditor';
import { TaskDocEditor } from '../components/TaskDocEditor/TaskDocEditor';
import { tasksGetAll } from '../store/tasks/tasksActions';
import { taskDocGet } from '../store/taskDocs/taskDocsActions';
import { AppReducer } from '../types/baseTypes';

const TasksPage = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const { userDef } = useSelector((state: AppReducer) => state.auth);
  const { taskMap } = useSelector((state: AppReducer) => state.tasks);
  const { blobs } = useSelector((state: AppReducer) => state.taskDocs);

  // @ts-ignore
  const taskId: void | string = params.taskId !== undefined ? params.taskId : undefined;
  const [task, setTask] = useState(null);
  const [taskDoc, setTaskDoc] = useState(null);
  
  useEffect(() => {
    if (userDef) {
      dispatch(tasksGetAll(userDef.userId));
    }
  }, [taskId]);

  useEffect(() => {
    if (taskMap && taskId && taskMap[taskId]) {
      setTask(taskMap[taskId]);
      dispatch(taskDocGet(taskId));
    }
  }, [taskMap]);

  useEffect(() => {
    if (blobs && taskId && blobs[taskId]) {
      setTaskDoc(blobs[taskId]);
    }
  }, [blobs]);


  const sidebarComponent = taskMap ? <TaskList taskMap={taskMap} taskId={taskId} /> : null;

  const contentComponent = task && taskDoc
    ? (
      <div className="task-editor">
        <TaskNameEditor task={task} />
        <TaskDocEditor taskId={taskDoc.taskId} blob={taskDoc.blob} key={taskDoc.taskId} />
      </div>
    ) : null;

  return <PrivatePage sidebarComponent={sidebarComponent} contentComponent={contentComponent} />;
};

export default TasksPage;


