import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {ChakraProvider} from '@chakra-ui/react'
import { createRoutesFromElements, createBrowserRouter, Route, BrowserRouter, Routes } from 'react-router-dom'
import LoginCard from './pages/Login.jsx'
import SignupCard from './pages/Register.jsx'





// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element={<App/>} >
//       <Route path='login' element={<LoginCard/>} />
//       <Route path='signup' element={<SignupCard/>} />
//     </Route>
//   )
// )

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<App/>}/>
          <Route path='/login' element={<LoginCard/>}/>
          <Route path='signup' element={<SignupCard/>}/>
        </Routes>
        </BrowserRouter>
    </ChakraProvider>               
  </React.StrictMode>,
)
