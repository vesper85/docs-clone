import userContext from "./userContext";
import { useParams } from 'react-router-dom';
import { EditorState, convertToRaw, convertFromRaw} from 'draft-js'
// import { useNavigate } from "react-router-dom";


import React, { useState } from 'react'

function UserStates({children}) {
    // Hooks Declaration
    // let navigate = useNavigate();



    const [uid, setUid] = useState(null)

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('docs_store_token') ? true : false)
    const [userDocs, setUserDocs] = useState([1,2,3,4,5,6,7,8,9,10])
    const [saving, setSaving] = useState(false)
    const [title, setTitle]  = useState("")


     const [editorState, setEditorState] = useState(()=> EditorState.createEmpty())

    
    const initialize = async () =>{
        
        if(!isLoggedIn) return;
        
        // fetch user and set user state if the auth-token is present in LS
        const token = localStorage.getItem('docs_store_token')
        const user = await fetchuserHandler(token);
        console.log(user.id);
        setUid(user.id)
    }

    const fetchuserHandler = async(token) => {
        try {
            // fetch with POST req
            // console.log('fetchuser function');
            const url = "http://localhost:3000/api/user/getuser"
            const response = await fetch(url, {
                method:'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                    'auth-token':token
                }
            })

            return response.json();
        } catch (error) {
            console.log(error);
        }
        
    }

    const handleDocCreate =async () =>{
        // fetch req to create doc
        // redirect to new document
        const url = "http://localhost:3000/api/document/createdocument"
        const response = await fetch(url,{
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'auth-token':localStorage.getItem('docs_store_token')
          },
          body:JSON.stringify({title:"asdf", data:"aasdf"})
        })
    
        const newDoc = await response.text();
        console.log(newDoc);
        navigate(`document/${newDoc.uid}`)
      }
    
    const fetchAllDocs = async() =>{
        const url = "http://localhost:3000/api/document/fetchdocuments"
        const response = await fetch(url,{
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'auth-token':localStorage.getItem('docs_store_token')
            }
        })
        // console.log(await response.json());
        const newarr = await response.json();
        if(response.ok){
            setUserDocs(newarr);
            // console.log(userDocs);
        }
    }

    const saveDocument = async (docid) => {
        // Save on Clicktitle, setTitle
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

    // const handleDocCreate = () =>{
    //     // button onclick -> GET fetch req to /createdoc api (save the doc file in db with default params) -> redirect to new doc path
    //     try {
    //         const response  = fetch(url,{
    //             method: GET,
    //             headers:{
    //                 'Content-Type': 'application/json',
    //                 'accept': 'application/json',
    //                 'auth-token':localStorage.getItem('docs_store_token')
    //             }
    //         })
    //         // rediret to new page
            
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

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
    <userContext.Provider value={{fetchuserHandler, initialize,isLoggedIn, setIsLoggedIn,uid,fetchAllDocs, userDocs,editorState, setEditorState,title, setTitle, saveDocument,fetchDoc}}>
        {children}
    </userContext.Provider>
  )
}

export default UserStates