import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {useContext} from 'react';
import {Context} from '../contexts/UserContext'
import { useEffect } from "react";


const ProtectedRoutes = () => {
  const {authUser} = useContext(Context);
  const navigate = useNavigate()
  const location = useLocation();

  useEffect(()=> {
    if(authUser === null) {
        navigate('/login', {state: location})
    }
  })

  return ( authUser !== null && <Outlet/> )
}
export default ProtectedRoutes;