import React, { useEffect, useState , useRef} from 'react'
import editorContext from './editorContext'
import { EditorState, convertToRaw, convertFromRaw,RichUtils} from 'draft-js'
import { io } from 'socket.io-client'

function EditorStates({children}) {
    const socket = useRef(null);

    const [editorState, setEditorState] = useState(()=> EditorState.createEmpty())
    const [title, setTitle]  = useState("")
    const [saving, setSaving] = useState(false)
    const editorRef = useRef(null)
    
    useEffect(() => {
        socket.current = io("ws://localhost:3000").connect();
    }, [socket])
    

    useEffect(() => {
        //  fetchDoc()
        socket.current.on("connect",()=>{
          console.log("connected to the server",socket.current.id);
        })
        socket.current.on("new-remote-ops",({content, editorId})=>{
          // if change is from remote editor the set state transmitted value
          if(socket.current.id !== editorId && content !== null){
            console.log("remote change");
            const contentState = convertFromRaw(content);
            const newEditorState = EditorState.createWithContent(contentState)
            setEditorState(newEditorState)
          }
        })
      
        return
       }, [socket.current])
    

    const handleKeyCommand = (command, editorState) =>{
        const newState = RichUtils.handleKeyCommand(editorState, command)
        
        if (newState) {
            setEditorState(newState)
            console.log("key command");
            console.log(newState);
        }
    
      }
    
      const handleOnChange = (editorState) => {
        setEditorState(editorState);
        if (socket === null) return;
        const content = convertToRaw(editorState.getCurrentContent());
        const data = {content, editorId: socket.id}
    
        // //emmit changes with socket event
        socket.current.emit("new-ops", data)   
    
        // if (saveInterval !== null) {
        //   clearInterval(saveInterval);
        // }
    
    
        // saveInterval = setInterval(async () => {
        //   await saveDocument(updatedDocument);
        //   if (saveInterval) clearInterval(saveInterval);
        // }, DEFAULT_SAVE_TIME);
      }


      const saveDocument = async (docid) => {
        // Save on Clicktitle, setTitle
        console.log(docid);
        try {
            const data = convertToRaw(editorState.getCurrentContent());
            const url = `http://localhost:3000/api/document/updatedocument/${docid}`
            const response = fetch(url,{
                method:"PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                    'auth-token':localStorage.getItem('docs_store_token')
                  },
                  body:JSON.stringify({title, data})
            })
            if(response.ok){
                console.log("Document Saved");
            }
          } catch (error) {
            console.log("There was an error saving the document. Please try again.");
            console.log(error);
          }finally{
            setSaving(false)
          }
    }

    const fetchDoc = async(docid) =>{
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

            const parsedResponse = await response.json();
            const{title, data} = parsedResponse
            setTitle(title);
            const contentState = convertFromRaw(data);
            const newEditorState = EditorState.createWithContent(contentState)
            setEditorState(newEditorState)
            console.log(data);
            // return data;
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <editorContext.Provider value={{handleKeyCommand,handleOnChange,editorState, setEditorState,saveDocument,fetchDoc,title, setTitle,editorRef}} >
        {children}
    </editorContext.Provider>
  )
}

export default EditorStates