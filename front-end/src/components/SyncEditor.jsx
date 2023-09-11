'use-strict'
import React, { useCallback, useContext, useRef, useEffect } from 'react'
import {Editor} from 'draft-js'
import userContext from '../context/User/userContext';
import editorContext from '../context/editor/editorContext';
import { useParams } from 'react-router-dom';


function Sandbox() {

  const context = useContext(userContext);
  const editorCon = useContext(editorContext);
  const {docid} = useParams();
  const {saveDocument,fetchDoc,title,setTitle} = editorCon;

  
  // const {editorState, setEditorState} = context
  const{handleKeyCommand,handleOnChange,editorState, setEditorState,editorRef} = editorCon


  const focusEditor = () =>{
    editorRef.current.focus()
  }

  return (
    <>
    <div style={{ height: '1100px' }}
      className="bg-white shadow-md flex-shrink-0 cursor-text p-10 border-2 border-blue-600"
      onClick={focusEditor}>
        <Editor className="h-[500px]" ref={editorRef} editorState={editorState} onChange={handleOnChange} handleKeyCommand={handleKeyCommand} />
    </div>
    </>
  )
}

export default Sandbox
