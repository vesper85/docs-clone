import { useContext, useEffect, useState } from 'react'
import './App.css'

import Navigation from './components/Navigation';
import DocumentCollection from './components/DocumentCollection';

import userContext from './context/User/userContext';
import DocCrtBtn from './components/DocCrtBtn';
import {io} from 'socket.io-client'




function App() {
  console.log("number of times");
  
  useEffect(()=>{
    
  },[])
  

  const context = useContext(userContext)
  const { initialize} = context;

  useEffect(() => {
    // get the token if stored in localstorage
    initialize();
  }, [])

  
  return (
    <>
      <main>
        {/* Nav */}
        <Navigation/>
        {/* Mid Section - Create New Documents */}
        <div className="max-h-80 h-[16rem] bg-google-gray">
            <div className="w-[50%] mx-auto h-full flex items-center">
                 <DocCrtBtn/>
            </div>
        </div>
        {/* Display all User documents */}
        <DocumentCollection/>
      </main>
    </>
  )
}

export default App
