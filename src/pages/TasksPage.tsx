import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';

import Sidebar from '../components/Sidebar/Sidebar';
import Content from '../components/Content/Content';
import Logo from '../components/Logo/Logo';
import ThemeSwitch from '../components/ThemeSwitch/ThemeSwitch';
import SidebarToggle from '../components/SidebarToggle/SidebarToggle';
import AuthedLinks from '../components/AuthedLinks/AuthedLinks';
import Loader from '../components/Loader/Loader';
import TaskList from '../components/TaskList/TaskList';
import CreateTaskItem from '../components/CreateTaskItem/CreateTaskItem';
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

function TasksContent(props: TasksContentProps) {
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
}

function TasksPage() {
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
    <div className="app">
      <Sidebar>
        <Logo />
        <ThemeSwitch />
        <SidebarToggle />
        <CreateTaskItem />
        {taskMap ? <TaskList taskMap={taskMap} taskId={taskId} /> : null}
      </Sidebar>
      <Content>
        <AuthedLinks />
        {<TasksContent taskMap={taskMap} task={task} taskDoc={taskDoc} />}
      </Content>
    </div>
  );
}

export default TasksPage;


