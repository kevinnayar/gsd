import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { Icon } from '../Icon/Icon';
import { updateTaskDoc } from '../../utils/baseUtils';
import { TaskDoc } from '../../types/taskDocTypes';

type TaskDocEditorProps = {
  taskName: string,
  taskDoc: TaskDoc,
  updateTaskDoc: (taskDoc: TaskDoc) => void;
};      

export function TaskDocEditor(props: TaskDocEditorProps) {
  console.log(props.taskDoc.blob);
  const [markdownText, setMarkdownText] = useState<string>(props.taskDoc.blob);
  const [mode, setMode] = useState<'edit'|'preview'>('edit');

  const iconName = mode === 'edit' ? 'visibility' : 'create';
  const toggleMode = () => setMode(mode === 'edit' ? 'preview' : 'edit');

  const onInputChange = (e: any) => {
    const blob = e.currentTarget.value;
    setMarkdownText(blob);
    const taskDoc = updateTaskDoc(props.taskDoc, blob);
    props.updateTaskDoc(taskDoc);
  }

  useEffect(() => {
    setMarkdownText(props.taskDoc.blob);
  }, [props.taskDoc]);

  return (
    <div className="editor">
      <h1 className="editor__title">{props.taskName}</h1>
      <div className={`editor__section editor__section--${mode}`}>
        <Icon iconName={iconName} className="editor-mode-toggle" onClick={toggleMode} />
        <textarea value={markdownText} onChange={onInputChange} className={`textarea textarea--${mode === 'edit' ? 'visible' : 'hidden'}`} />
        {mode === 'preview' && <ReactMarkdown plugins={[gfm]} source={markdownText} />}
      </div>
    </div>
  );
}