import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Skeleton } from '@chakra-ui/react'
import './App.css'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import {EmailIcon} from '@chakra-ui/icons'

function App() {
  const [count, setCount] = useState({});
  // const data  = awaitfetch('http://localhost:3000/api/user/createuser')

  return (
    <>
      <InputGroup>
        <InputLeftElement pointerEvents='none'>
          <EmailIcon color='gray.300' />
        </InputLeftElement>
        <Input type='string' colorScheme='linkedin' placeholder='Email'/>
        {/* <Input type='string' colorScheme='facebook' placeholder='Email'/>
        <Input type='string' colorScheme='messenger' placeholder='Email'/> */}
      </InputGroup>
   
    </>
  )
}

export default App
