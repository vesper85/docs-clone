import React, { useContext, useEffect, useState } from 'react'
import Card from './Card'
import {Link} from 'react-router-dom'
import userContext from '../context/User/userContext'
// import Sandbox from './Sandbox';

function DocumentCollection() {
    let context = useContext(userContext)
    const {isLoggedIn} = context;
    useEffect(()=>{
        if(isLoggedIn){
            fetchAllDocs();
        }
    },[])

    const [userDocs, setUserDocs] = useState([1,2,3,4,5,6,7,8,9,10])

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
  return (
    <section className="max-w-6xl mx-auto h-max">
        <div className="m-4 grid grid-cols-5 gap-4">
            {
                userDocs.map((ele)=>{
                    return(
                        <Link to={`/document/${ele.doc_id}`} key={ele.doc_id || ele} ><Card {...ele}  /></Link>
                        
                    )
                })
            }
        </div>
    
    </section>

  )
}

export default DocumentCollection