import React from 'react'
import { useNavigate, Link,useLocation } from "react-router-dom";

function DocCrtBtn() {
    let navigate = useNavigate();
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

  return (
        <button onClick={handleDocCreate} >
            <div className="w-40 h-52 bg-white border-gray-200 border-[0.0005rem]"></div>
        </button>
  )
}

export default DocCrtBtn