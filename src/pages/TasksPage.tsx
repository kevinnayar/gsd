import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';

import PrivatePage from './PrivatePage';
import Loader from '../components/Loader/Loader';
import TaskList from '../components/TaskList/TaskList';
import TaskNameEditor from '../components/TaskNameEditor/TaskNameEditor';
import TaskDocEditor from '../components/TaskDocEditor/TaskDocEditor';
import NoneTaskEditor from '../components/NoneTaskEditor/NoneTaskEditor';

import { tasksGetAll } from '../store/tasks/tasksActions';
import { taskDocGet } from '../store/taskDocs/taskDocsActions';
import { ITaskItem, TaskMap } from '../types/taskTypes';
import { TaskDoc } from '../types/taskDocTypes';
import { AppReducer } from '../types/baseTypes';

type TasksContentProps = {
  taskMap: null | TaskMap;
  task: null | ITaskItem;
  taskDoc: null | TaskDoc;
};

const TasksContentComponent = (props: TasksContentProps) => {
  const { taskMap, task, taskDoc } = props;

  if (taskMap && !Object.keys(taskMap).length) return <NoneTaskEditor hasTasks={false} />;

  if (taskMap && Object.keys(taskMap).length && !task) return <NoneTaskEditor hasTasks={true} />;

  const [sticky, setSticky] = useState(false);

  const ref = useRef(null);

  const handleScroll = () => {
    if (ref.current) {
      setSticky(ref.current.getBoundingClientRect().top <= 0);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, []);

  if (task && taskDoc) {
    return (
      <div ref={ref} className="task-editor">
        <TaskNameEditor
          task={task}
          sticky={sticky}
        />
        <TaskDocEditor
          key={taskDoc.taskId}
          sticky={sticky}
          taskId={taskDoc.taskId}
          blob={taskDoc.blob}
        />
      </div>
    );
  }

  return <Loader />;
};

const TasksPage = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const { userDef } = useSelector((state: AppReducer) => state.auth);
  const { taskMap } = useSelector((state: AppReducer) => state.tasks);
  const { blobs } = useSelector((state: AppReducer) => state.taskDocs);

  // @ts-ignore
  const taskId: void | string = params.taskId !== undefined ? params.taskId : undefined;
  const [task, setTask] = useState<null | ITaskItem>(null);
  const [taskDoc, setTaskDoc] = useState<null | TaskDoc>(null);
  
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

  return (
    <PrivatePage
      sidebarComponent={taskMap ? <TaskList taskMap={taskMap} taskId={taskId} /> : null}
      contentComponent={<TasksContentComponent taskMap={taskMap} task={task} taskDoc={taskDoc} />}
    />
  );
};

export default TasksPage;


