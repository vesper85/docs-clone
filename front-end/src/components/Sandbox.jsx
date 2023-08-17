import React, { useCallback, useState } from 'react'
import { Editor, Element, Transforms, createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import {CodeElement, DefaultElement, Leaf} from '../slate-components/CodeElement'

function Sandbox() {
    
    const [editor] = useState(()=>withReact(createEditor()))
    const initialValue = [
      {
        type: 'paragraph',
        children:[{text: 'A line of text in a paragraph'}],
      },
    ]


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



  return (
    <Slate editor={editor} initialValue={initialValue}>
      <Editable onKeyDown={handleKeyDown} renderElement={renderSlateElement} renderLeaf={renderLeaf} />
    </Slate>
  )
}

export default Sandbox