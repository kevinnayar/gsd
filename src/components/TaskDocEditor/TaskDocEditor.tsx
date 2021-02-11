import * as React from 'react';
import debounce from 'lodash.debounce';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import BalloonEditor from '@ckeditor/ckeditor5-build-balloon';
import { taskDocUpdate } from '../../store/taskDocs/taskDocsActions';

export const TaskDocEditor = (props: { taskId: string, blob: string }) => {
  const dispatch = useDispatch();
  const { taskId, blob } = props;
  const [docMap, setDocMap] = useState({ [taskId]: blob });

  useEffect(() => {
    setDocMap({ [props.taskId]: props.blob });
  }, [props.taskId]);

  const debouncedOnChangeBlob = useCallback(debounce((taskIdIn, data) => {
    dispatch(taskDocUpdate(taskIdIn, data));
  }, 500, { maxWait: 1000 }), []);

  const onChangeBlob = (_e: any, editor: any) => {
    const data = editor.getData();
    setDocMap({ [taskId]: data });
    debouncedOnChangeBlob(taskId, data);
  };

  const config = {
    toolbar: ['heading', 'bold', 'italic', '|', 'link', 'numberedList', 'bulletedList'],
  };

  return (
    <CKEditor
      editor={BalloonEditor}
      data={docMap[taskId]}
      config={config}
      onChange={onChangeBlob}
    />
  );
};