import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import userContext from '../context/User/userContext'

function Card({title, data,doc_id}) {

  const context = useContext(userContext);
  const {fetchAllDocs} = context;
  const handleDocRemove = async () =>{
    const url = `http://localhost:3000/api/document/deletedocument/${doc_id}`
    const response = await fetch(url,{
        method:'DELETE',
        headers:{
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'auth-token':localStorage.getItem('docs_store_token')
        }
    })

    if(response.ok){
        console.log("document deleted");
        fetchAllDocs();
    }
}
  return (
    <>
        <div className="max-w-[15rem] rounded-sm shadow-md dark:bg-gray-900 dark:text-gray-100">
          <Link to={`/document/${doc_id}`} >
            <img src="https://source.unsplash.com/random/300x300/?2" alt="" className="object-cover object-center w-full rounded-t-sm h-64 dark:bg-gray-500" />
            <div className="flex flex-col p-4 text-xs">
              <div className="font-semibold">Title of the Document</div> 
              <div className='text-gray-400'>logo and date created</div>
            </div>
          </Link>
          <button onClick={handleDocRemove}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 right-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </button>
        </div>
    </>
  )
}

export default Card