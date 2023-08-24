import userContext from "./userContext";
// import { useNavigate } from "react-router-dom";


import React, { useState } from 'react'

function UserStates({children}) {
    // Hooks Declaration
    // let navigate = useNavigate();



    const [uid, setUid] = useState(null)

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('docs_store_token') ? true : false)

    
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

    // const fetchDoc = async(docid) =>{
    //     try {
    //         const response = await fetch(url, {
    //             method:"GET",
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'accept': 'application/json',
    //                 'auth-token':localStorage.get('docs_store_token'),
    //                 'doc_id':docid
    //               }
    //         })

    //         const data = response.json();
    //         return data;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
  return (
    <userContext.Provider value={{fetchuserHandler, initialize,isLoggedIn, setIsLoggedIn,uid}}>
        {children}
    </userContext.Provider>
  )
}

export default UserStates