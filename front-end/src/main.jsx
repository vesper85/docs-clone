import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createRoutesFromElements, createBrowserRouter, Route, RouterProvider } from 'react-router-dom'
import LoginCard from './pages/Login.jsx'
import SignupCard from './pages/Register.jsx'
import UserStates from './context/User/UserStates.jsx'





const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' >
      <Route index element={<App/>} />
      <Route path='login' element={<LoginCard/>} />
      <Route path='signup' element={<SignupCard/>} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserStates>
    <RouterProvider router={router}/>  
    </UserStates> 
  </React.StrictMode>,
)
