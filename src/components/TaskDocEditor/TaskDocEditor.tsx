import * as React from 'react';
import debounce from 'lodash.debounce';

import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import BalloonEditor from '@ckeditor/ckeditor5-build-balloon';

import { taskDocGet, taskDocUpdate } from '../../store/taskDocs/taskDocsActions';
import { taskUpdate } from '../../store/tasks/tasksActions';
import { extractError, updateTaskDoc } from '../../utils/baseUtils';

import { AppReducer } from '../../types/baseTypes';
import { ITaskItem } from '../../types/taskTypes';
import { TaskDoc } from '../../types/taskDocTypes';

export function TaskDocEditor(props: { task: ITaskItem, taskDoc: TaskDoc }) {
  const dispatch = useDispatch();
  const { db } = useSelector((state: AppReducer) => state.auth);
  const [taskName, setTaskName] = useState(props.task.name);
  const [taskDoc, setTaskDoc] = useState(props.taskDoc);

  // task name
  const onChangeTaskName = (e: any) => {
    setTaskName(e.target.value);
  };

  const onBlurTaskName = (e: any) => {
    const name = e.target.value.trim();
    setTaskName(name);
    const task = {
      ...props.task,
      name,
    };
    dispatch(taskUpdate(db, task));
  };

  // blob
  const debouncedOnChangeBlob = useCallback(debounce(doc => {
    dispatch(taskDocUpdate(db, doc));
  }, 500, { maxWait: 1000 }), []);

  const onChangeBlob = (_e: any, editor: any) => {
    const blob = editor.getData();
    const newTaskDoc = updateTaskDoc(taskDoc, blob);
    setTaskDoc(newTaskDoc);
    debouncedOnChangeBlob(newTaskDoc);
  };

  const onBlurBlob = (_e: any, editor: any) => {
    const blob = editor.getData();
    const newTaskDoc = updateTaskDoc(taskDoc, blob);
    setTaskDoc(newTaskDoc);
    dispatch(taskDocUpdate(db, newTaskDoc));
  };

  if (!taskDoc) return null;

  const config = {
    toolbar: ['heading', 'bold', 'italic', '|', 'link', 'numberedList', 'bulletedList'],
  };

  return (
    <div className="task-doc-editor">
      <input
        className="task-doc-editor__title"
        value={taskName}
        onChange={onChangeTaskName}
        onBlur={onBlurTaskName}
      />
      <CKEditor
        editor={BalloonEditor}
        data={taskDoc.blob}
        config={config}
        onChange={onChangeBlob}
        onBlur={onBlurBlob}
      />
    </div>
  );
}


