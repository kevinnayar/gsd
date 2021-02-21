import * as React from 'react';
import debounce from 'lodash.debounce';
import { 
  Editor,
  EditorState,
  RichUtils,
  DraftEditorCommand,
  ContentState,
  RawDraftContentState,
  convertFromRaw,
  convertToRaw,
} from 'draft-js';
import { useState, useEffect, useCallback } from 'react';
import Icon from '../Icon/Icon';
import { useDispatch } from 'react-redux';
import { taskDocUpdate } from '../../store/taskDocs/taskDocsActions';


const PLACEHOLDER_TEXTS = [
  'In a hole in the ground there lived a hobbit.',
  'All of this happened, more or less.',
  'It was a bright day in April, and the clocks were striking thirteen.',
  'Call me Ishmael.',
  'It was the best of times, it was the worst of times...',
  'I am an invisible man.',
  'I am a sick man... I am a spiteful man.',
  'The moment one learns English, complications set in.',
  'It was a pleasure to burn',
];

function getRandomPlaceholderText() {
  const index = Math.floor(Math.random() * PLACEHOLDER_TEXTS.length);
  return PLACEHOLDER_TEXTS[index];
}

const BLOCK_STYLES = [
  { label: 'h1', style: 'header-one' },
  { label: 'h2', style: 'header-two' },
  { label: 'h3', style: 'header-three' },
  // { label: 'P', style: 'paragraph'},
  { label: 'Blockquote', icon: 'format_quote', style: 'blockquote' },
  { label: 'Ordered List', icon: 'format_list_bulleted', style: 'unordered-list-item' },
  { label: 'Numbered List', icon: 'format_list_numbered', style: 'ordered-list-item' },
  { label: 'Code', icon: 'code', style: 'code-block' },
];

const INLINE_STYLES = [
  { label: 'Bold', icon: 'format_bold', style: 'BOLD' },
  { label: 'Italic', icon: 'format_italic', style: 'ITALIC' },
  { label: 'Underline', icon: 'format_underline', style: 'UNDERLINE' },
  // { label: 'Monospace', icon: 'format_bold', style: 'CODE' },
];

type StyleButtonProps = {
  active: boolean;
  label: string;
  style: string;
  icon?: string;
  onToggle: (style: string) => void;
};

function StyleButton(props: StyleButtonProps) {
  const [className, setClassName] = useState('RichEditor-styleButton');

  function onToggle(e: any) {
    e.preventDefault();
    props.onToggle(props.style);
  }

  useEffect(() => {
    if (props.active) {
      setClassName('RichEditor-styleButton RichEditor-activeButton');
    } else {
      setClassName('RichEditor-styleButton');
    }
  }, [props.active]);

  return (
    <div className={className} onMouseDown={onToggle}>
      {props.icon ? <Icon iconName={props.icon} className={props.icon} /> : <span className="icon">{props.label}</span>}
    </div>
  );
}

type StyleControlsProps = {
  editorState: EditorState,
  onToggle: (style: string) => void,
};

function InlineStyleControls(props: StyleControlsProps) {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls style-controls style-controls--inline">
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
          icon={type.icon}
        />
      ))}
    </div>
  );
};

function BlockStyleControls(props: StyleControlsProps) {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls style-controls style-controls--block">
      {BLOCK_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
          icon={type.icon}
        />
      ))}
    </div>
  );
};

type CustomEditorProps = {
  sticky: boolean,
  existingContent: null | ContentState;
  onChange: (editorState: EditorState) => void;
};

function CustomEditor(props: CustomEditorProps) {
  const editor = React.useRef(null);
  
  const initialEditorState = props.existingContent
    ? EditorState.createWithContent(props.existingContent)
    : EditorState.createEmpty();
  const [editorState, setEditorState] = useState<EditorState>(initialEditorState);

  const PLACEHOLDER = getRandomPlaceholderText();
  const [placeholderText, setPlaceholderText] = useState(PLACEHOLDER);

  const focusEditor = () => {
    if (editor) {
      setPlaceholderText('');
      editor.current.focus();
    }
  };

  const onBlur = () => {
    if (editor) {
      const contentState: ContentState = editorState.getCurrentContent();
      if (!contentState.hasText()) {
        setPlaceholderText(PLACEHOLDER);
      }
    }
  };

  const onChange = (state: EditorState) => {
    setEditorState(state);
    props.onChange(state);
  };

  const toggleInlineStyle = (inlineStyle: string) => {
    onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const toggleBlockType = (blockType: string) => {
    onChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  const handleKeyCommand = (command: DraftEditorCommand, state: EditorState) => {
    const newState = RichUtils.handleKeyCommand(state, command);

    if (newState) {
      onChange(newState);
      return 'handled';
    }

    return 'not-handled';
  };

  return (
    <div className={`custom-editor ${props.sticky ? 'custom-editor--sticky' : ''}`} onClick={focusEditor}>
      <div className="custom-editor__controls">
        <InlineStyleControls
          editorState={editorState}
          onToggle={toggleInlineStyle}
        />
        <BlockStyleControls
          editorState={editorState}
          onToggle={toggleBlockType}
        />
      </div>
      <Editor
        ref={editor}
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholderText}
        spellCheck
      />
    </div>
  );
}

type TaskDocEditorProps = {
  taskId: string,
  blob: RawDraftContentState,
  sticky: boolean,
};

function TaskDocEditor(props: TaskDocEditorProps) {
  const dispatch = useDispatch();
  const { taskId, blob } = props;
  const [docMap, setDocMap] = useState({ [taskId]: blob });

  useEffect(() => {
    setDocMap({ [props.taskId]: props.blob });
  }, [props.taskId]);

  const debouncedOnChange = useCallback(debounce((taskIdIn, data) => {
    dispatch(taskDocUpdate(taskIdIn, data));
  }, 500, { maxWait: 1000 }), []);

  const onChange = (editorState: EditorState) => {
    const contentState: ContentState = editorState.getCurrentContent();
    const rawContentState: RawDraftContentState = convertToRaw(contentState);
    debouncedOnChange(taskId, rawContentState);
  };

  return (
    <CustomEditor
      sticky={props.sticky}
      existingContent={convertFromRaw(blob)}
      onChange={onChange}
    />
  );
}

export default React.memo(TaskDocEditor);



