import { useState } from 'react'
import { Link } from 'react-router-dom';

import './App.css'
import Card from './components/Card';
import Navigation from './components/Navigation';
import DocumentCollection from './components/DocumentCollection';
import Sandbox from './components/Sandbox';



function App() {
  const [count, setCount] = useState({});
  // const data  = awaitfetch('http://localhost:3000/api/user/createuser')


  return (
    <>
      <main>
        {/* Nav */}
        <Navigation/>


        {/* Mid Section - Create New Documents */}
        <div className="max-h-80 h-[16rem] bg-google-gray">
            <div className="w-[50%] mx-auto h-full ">
                <div>Starting a new document</div>
                <div>
                    
                </div>
            </div>
        </div>


        {/* Display all User documents */}
        {/* <DocumentCollection/> */}
        <Sandbox/>
      </main>
    </>
  )
}

export default App
