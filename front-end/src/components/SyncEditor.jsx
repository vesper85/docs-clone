'use-strict'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw} from 'draft-js'

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { io } from 'socket.io-client'
import userContext from '../context/User/userContext';


const socket = io("ws://localhost:3000");

// const DEFAULT_SAVE_TIME = 1500;
// let saveInterval = null;



function Sandbox() {

  const context = useContext(userContext);
  const {editorState, setEditorState} = context



  useEffect(() => {
    //  fetchDoc()
  
    socket.on("connect",()=>{
      console.log("connected to the server",socket.id);
    })
    socket.on("new-remote-ops",({content, editorId})=>{
      // if change is from remote editor the set state transmitted value
      if(socket.id !== editorId && content !== null){
        console.log("remote change");
        const contentState = convertFromRaw(content);
        const newEditorState = EditorState.createWithContent(contentState)
        setEditorState(newEditorState)
      }
    })
  
    return
   }, [])


  const editorRef = useRef(null)
  const handleKeyCommand = (command, editorState) =>{
    const newState = RichUtils.handleKeyCommand(editorState, command)

    if (newState) {
      setEditorState(newState)
      console.log(newState);
    }

  }

  const handleOnChange = (editorState) => {
    setEditorState(editorState);
    const content = convertToRaw(editorState.getCurrentContent());
    // console.log(editorState, content);
    // console.log(content);
    const data = {content, editorId: socket.id}

    // //emmit changes with socket event
    socket.emit("new-ops", data)   

    // if (saveInterval !== null) {
    //   clearInterval(saveInterval);
    // }


    // saveInterval = setInterval(async () => {
    //   await saveDocument(updatedDocument);
    //   if (saveInterval) clearInterval(saveInterval);
    // }, DEFAULT_SAVE_TIME);
  }

  return (
    <>
        <Editor ref={editorRef} editorState={editorState} onChange={handleOnChange} handleKeyCommand={handleKeyCommand} />
    </>
  )
}

export default Sandbox
