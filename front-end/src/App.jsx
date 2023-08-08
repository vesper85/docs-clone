import { useState } from 'react'
import { Link } from 'react-router-dom';

import './App.css'
import { HStack, Link as CLink } from '@chakra-ui/react';



function App() {
  const [count, setCount] = useState({});
  // const data  = awaitfetch('http://localhost:3000/api/user/createuser')


  return (
    <>
      <HStack spacing={'20px'} > 
        <Link to={"/login"}>login</Link>
        <Link to={"/signup"}>signup</Link>
      </HStack>
    </>
  )
}

export default App
