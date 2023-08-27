'use-strict'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Editor, Element, Transforms, createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import {CodeElement, DefaultElement, Leaf} from '../slate-components/CodeElement'
import { useParams } from 'react-router-dom'
import { io } from 'socket.io-client'

const socket = io("ws://localhost:3000");


function Sandbox() {
  const defaultV = [
    {
      type: 'paragraph',
      children:[{text: 'A line'}],
    },
  ]
  const [editor] = useState(()=>withReact(createEditor()))
  const [initialValue,setInitialValue] = useState(defaultV)
  const {docid} = useParams();


   useEffect(() => {
    //  fetchDoc()
  
    socket.on("connect",()=>{
      console.log("connected to the server",socket.id);
      socket.on("new-remote-ops",(data)=>{
        // if change is from remote editor the set state transmitted value
  
        console.log("new-remote-operations triggered");
        console.log(data.EditorId);
        if(data.EditorId != socket.id){
          console.log(data.ops);
          setInitialValue(data.ops)
          editor.children = data.ops
        }
      })
    })
    socket.on("disconnect", () => {
      console.log(socket.connected); // false
    });

    
   
     return 
   }, [])
  

    const renderSlateElement = useCallback(props =>{
      switch(props.element.type){
        case 'code':
          return <CodeElement {...props} />
        default:
          return <DefaultElement {...props}/>
      }
    },[])

    const renderLeaf = useCallback(props => {
      return <Leaf {...props}/>
    },[])


    const handleKeyDown = (e) =>{
      // console.log(e);
      if(!e.ctrlKey) return;
      switch(e.key){
        case '`':{
          e.preventDefault();
          const [match] = Editor.nodes(editor, {
            match: n => n.type === 'code',
          })
          Transforms.setNodes(
            editor,
            {type: match ? 'paragraph' : 'code'},
            {
              match: n => Element.isElement(n) && editor.isBlock(editor,n)
            }
          )
          break
        }
        case 'b':{
          e.preventDefault();
          // console.log('ctrl + b');
          const marks = Editor.marks(editor)
          console.log(marks);
          if(marks.bold){
            Editor.removeMark(editor,'bold');
          }else{
            Editor.addMark(editor,'bold',true)
          }
      
          break;
        }
      }
    }

    // save the change state in db and emmit the event to other connec
    const handleEditorOnChange = (ops) =>{
      const isChange = editor.operations.some(op => 'set_selection' !== op.type)
      if(isChange){
        // on significant change set the state of editor to current
        // emmit an editor-change event has the value params
        // 
        setInitialValue(ops)
        console.log("change in the editor");
        const data = {
          EditorId:socket.id,
          ops,
        }
        socket.emit("new-ops",data)
      }
    }

  return (
    <>
      <Slate editor={editor} initialValue={initialValue} onChange={handleEditorOnChange}  >
        <Editable onKeyDown={handleKeyDown} renderElement={renderSlateElement} renderLeaf={renderLeaf} />
      </Slate>
    </>
  )
}

export default Sandbox


  
  
  //  const fetchDoc = async() =>{
  //   try {
  //       const url = "http://localhost:3000/api/document/fetchdocument"
  //       const response = await fetch(url, {
  //           method:"GET",
  //           headers: {
  //               'Content-Type': 'application/json',
  //               'accept': 'application/json',
  //               'auth-token':localStorage.getItem('docs_store_token'),
  //               'doc_id':docid
  //             }
  //       })
  //       // console.log(await response.text());
  //       const parsed = await response.json();
  //       setInitialValue(parsed.data)
  //       console.log(parsed.data);

  //   } catch (error) {
  //       console.log(error);
  //   }
  // }
