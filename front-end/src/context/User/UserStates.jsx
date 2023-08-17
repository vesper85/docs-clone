import userContext from "./userContext";


import React, { useState } from 'react'

function UserStates({children}) {
    const [uid, setUid] = useState(null)

    const [isLoggedin, setIsLoggedin] = useState(localStorage.getItem('docs_store_token') ? true : false)

    
    const initialize = async () =>{
        // fetch user and set user state if the auth-token is present in LS
        const token = localStorage.getItem('docs_store_token')
        const user = await fetchuserHandler(token);
        console.log(user.id);
        setUid(user.id)
    }

    const fetchuserHandler = async(token) => {
        try {
            // fetch with POST req
            console.log('fetchuser function');
            const url = "http://localhost:3000/api/user/getuser"
            const response = await fetch(url, {
                method:'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                    'auth-token':token
                }
            })

            return response.json();
        } catch (error) {
            console.log(error);
        }
        
    }
  return (
    <userContext.Provider value={{fetchuserHandler, initialize,isLoggedin, setIsLoggedin,uid}}>
        {children}
    </userContext.Provider>
  )
}

export default UserStates