import React from 'react'
import MonacoEditor from 'react-monaco-editor';
import './style.less';

export const CodeEditor: React.FC = () => {
  const editorDidMount = (editor, monaco) =>{
    console.log('editorDidMount', editor);
    editor.focus();
  }
  const onChange = (newValue, e)=> {
    console.log('onChange', newValue, e);
  }
  // const code = this.state.code;
  const options = {
    selectOnLineNumbers: true
  };
  return <MonacoEditor
    // width="800"
    // height="600"
    language="javascript"
    theme={'vs-dark'}
    value={`function HelloWorld (context,tools){
    console.log('hello world')
}`}
    options={options}
    onChange={onChange}
    editorDidMount = {editorDidMount }
  />
}