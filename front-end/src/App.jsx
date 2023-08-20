import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import './App.css'
import Card from './components/Card';
import Navigation from './components/Navigation';
import DocumentCollection from './components/DocumentCollection';
import Sandbox from './components/Sandbox';
import userContext from './context/User/userContext';



function App() {
  const [count, setCount] = useState({});
  // const data  = awaitfetch('http://localhost:3000/api/user/createuser')
  const context = useContext(userContext)
  const {fetchuserHandler, initialize} = context;

  useEffect(() => {
    // get the token if stored in localstorage
    console.log(initialize());
  }, [])

  const handleDocCreate =() =>{
    console.log('doc created');
  }
  
  return (
    <>
      <main>
        {/* Nav */}
        <Navigation/>
        {/* Mid Section - Create New Documents */}
        <div className="max-h-80 h-[16rem] bg-google-gray">
            <div className="w-[50%] mx-auto h-full ">
                <div>Starting a new document</div>
                <button>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={handleDocCreate} className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
</svg>

                </button>
            </div>
        </div>
        {/* Display all User documents */}
        {/* <DocumentCollection/> */}
      </main>
    </>
  )
}

export default App
