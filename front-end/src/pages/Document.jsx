import React, { useContext, useEffect, useState } from 'react'
import SyncEditor from '../components/SyncEditor'
import { useParams } from 'react-router-dom';
import userContext from '../context/User/userContext';
import EditorToolbar from '../components/EditorToolbar';

function Document() {

  const context = useContext(userContext);
  const {docid} = useParams();
  const {title,setTitle,saveDocument,fetchDoc} = context;

  useEffect(() => {
    console.log("This is a test");
    fetchDoc(docid)
    
  }, [])
  

  const handleTitleChange = (e)=>{
    console.log("title changed");
    setTitle(e.target.value)
  }


  
  return (
    <>
      <div className='h-8 w-full bg-slate-500'> Tool bar</div>
      <div className="mt-12 w-full h-full">
        <div className="w-[80vw] mx-auto">
          <input className="my-4 py-2 px-4 border-2 border-blue-600 focus:border-transparent
" value={title} onChange={handleTitleChange}/>
          <EditorToolbar saveDocument={saveDocument} docid={docid} />
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


  // const disposeDoc = () =>{
  //   console.log("destroy");
  // }