import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Editor, Element, Transforms, createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import {CodeElement, DefaultElement, Leaf} from '../slate-components/CodeElement'
import { useParams } from 'react-router-dom'


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
     fetchDoc()
   
     return 
   }, [])
  
  
  
   const fetchDoc = async() =>{
    try {
        const url = "http://localhost:3000/api/document/fetchdocument"
        const response = await fetch(url, {
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'auth-token':localStorage.getItem('docs_store_token'),
                'doc_id':docid
              }
        })
        // console.log(await response.text());
        const parsed = await response.json();
        setInitialValue(parsed.data)
        console.log(parsed.data);

    } catch (error) {
        console.log(error);
    }
  }


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

    const handleEditorOnChange = (value) =>{
      const isChange = editor.operations.some(op => 'set_selection' !== op.type)
      if(isChange){
        const content = JSON.stringify(value);
        // localStorage.setItem('docs_content',content)
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