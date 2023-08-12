import { useState } from 'react'
import { Link } from 'react-router-dom';

import './App.css'



function App() {
  const [count, setCount] = useState({});
  // const data  = awaitfetch('http://localhost:3000/api/user/createuser')


  return (
    <>
      <div className="flex justify-center h-100 mt-2">
        <Link className='p-2 bg-slate-400 mx-5 rounded' to={"/login"}>login</Link>
        <Link className='p-2 bg-slate-400 mx-5 rounded' to={"/signup"}>signup</Link>
      </div>
    </>
  )
}

export default App
