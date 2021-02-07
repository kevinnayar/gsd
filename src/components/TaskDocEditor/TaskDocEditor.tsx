import * as React from 'react';
import debounce from 'lodash.debounce';
import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { Icon } from '../Icon/Icon';

import { taskDocGet, taskDocUpdate } from '../../store/taskDocs/taskDocsActions';

import { extractError, updateTaskDoc } from '../../utils/baseUtils';
import { AppReducer } from '../../types/baseTypes';
import { TaskDoc } from '../../types/taskDocTypes';
     

export function TaskDocEditor(props: { taskId: string }) {
  const dispatch = useDispatch();
  const location = useLocation();

  const { db } = useSelector((state: AppReducer) => state.auth);
  const { blobs, taskDocGetXferStatus } = useSelector((state: AppReducer) => state.taskDocs);
  
  const [taskDoc, setTaskDoc] = useState(null);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState<'edit'|'preview'>('edit');

  useEffect(() => {
    dispatch(taskDocGet(db, props.taskId));
  }, [location]);

  useEffect(() => {
    if (taskDocGetXferStatus.succeeded && blobs && blobs[props.taskId]) {
      setTaskDoc(blobs[props.taskId]);
    }
    if (taskDocGetXferStatus.failed) {
      setError(extractError(taskDocGetXferStatus.error));
    }
  }, [taskDocGetXferStatus]);  

  const iconName = mode === 'edit' ? 'visibility' : 'create';
  const toggleMode = () => setMode(mode === 'edit' ? 'preview' : 'edit');

  const debouncedOnChange = useCallback(debounce(doc => {
    dispatch(taskDocUpdate(db, doc));
  }, 500, { maxWait: 1000 }), []);

  const onChange = (newTaskDoc: TaskDoc) => {
    setTaskDoc(newTaskDoc);
    debouncedOnChange(newTaskDoc);
  };

  if (!taskDoc) return null;

  return (
    <div className="task-doc-editor">
      {/* <h1 className="task-doc-editor__title">{taskDoc.taskName}</h1> */}
      <div className={`task-doc-editor__section task-doc-editor__section--${mode}`}>
        <Icon iconName={iconName} className="task-doc-editor-mode-toggle" onClick={toggleMode} />
        <textarea
          className={`textarea textarea--${mode === 'edit' ? 'visible' : 'hidden'}`}
          value={taskDoc.blob} 
          onChange={(e: any) => {
            const blob = e.currentTarget.value;
            const newTaskDoc = updateTaskDoc(taskDoc, blob);
            onChange(newTaskDoc);
          }}
        />
        {mode === 'preview' && <ReactMarkdown plugins={[gfm]} source={taskDoc.blob} />}
      </div>
    </div>
  );
}


