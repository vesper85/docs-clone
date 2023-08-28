import React, { useContext, useEffect, useState } from 'react'
import SyncEditor from '../components/SyncEditor'
import { useParams } from 'react-router-dom';
import userContext from '../context/User/userContext';

function Document() {

  const handleTitleChange = ()=>{
    console.log("title changed");
  }
  return (
    <>
      <div className='h-8 w-full bg-slate-500'> Tool bar</div>
      <div className="mt-12 w-full h-full">
        <div className="w-[80vw] mx-auto">
          <input className="focus:border-0" value='Title of the Document' onChange={handleTitleChange}/>
          <SyncEditor />
          {/* <br/>
          <SyncEditor/> */}
        </div>
      </div>
    </>
  )
}

export default Document




  // const context = useContext(userContext);
  // const [doc, setDoc] = useState({title:"asdf",data:"asdf",UserEmail:"sample"})

  // const {docid} = useParams();
  // useEffect(()=>{
  //   // fetch the document
    
  // //  fetchDoc(docid);
  //   return disposeDoc;
  // },[])


  // const fetchDoc = async(docid) =>{
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
  //       const data = await response.json();
  //       setDoc(data)
  //       console.log(data);

  //   } catch (error) {
  //       console.log(error);
  //   }
  // }

  // const disposeDoc = () =>{
  //   console.log("destroy");
  // }