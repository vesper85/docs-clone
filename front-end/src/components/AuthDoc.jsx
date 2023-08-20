import React, { useContext } from 'react'
import userContext from '../context/User/userContext'
import { Navigate, useLocation } from 'react-router-dom';

function AuthDoc({children}) {
    const context = useContext(userContext);
    const location = useLocation();

    const {isLoggedIn} = context;

    if(!isLoggedIn){
        return <Navigate to={'/login'} state={{ from: location }} replace />;
    }
    return children

}

export default AuthDoc