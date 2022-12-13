import { createContext, useState, useEffect } from "react";
import userService from "../services/userService";


const Context = createContext()

const UserContextProvider = ({children}) => {
  const [authUser, setAuthUser] = useState();


  const onLoginClicked = async (e, values) => {
      const user = await userService.authorization (values) 
      if ( user.status === 401) {
        return false
      } else {
        window.localStorage.setItem ("user", JSON.stringify(user))
        setAuthUser (user);
        return true
      } }
           
      
  const onLogoutClicked = () => {
    localStorage.removeItem("user");
    setAuthUser(null);
  }

  useEffect(() => {
    if(localStorage.getItem("user")){
      setAuthUser(JSON.parse(localStorage.getItem("user")));
    } else{
      setAuthUser(null);
    }
  }, [])

  return (
      <Context.Provider value={{authUser, onLoginClicked, onLogoutClicked}}>
          {children}
      </Context.Provider>
  )
}

export {Context, UserContextProvider};



