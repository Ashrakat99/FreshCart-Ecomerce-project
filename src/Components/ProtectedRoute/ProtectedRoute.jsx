// import { Navigate } from 'react-router-dom';
// import { useContext } from 'react';
// import { UserContext } from '../../context/UserContext'; 

// const ProtectedRoute = ({ children }) => {
//     const { UserToken } = useContext(UserContext); 

//     if (!UserToken) {
//     return <Navigate to="/login" />; 
//     }

//     return children; 
// };

// export default ProtectedRoute;


import React from 'react'
import {Navigate} from 'react-router-dom'

export default function ProtectedRoute({children}) {

    if (localStorage.getItem('userToken')){
        return children
    }else{
        return <Navigate to={'/login'}/>
    }

}
