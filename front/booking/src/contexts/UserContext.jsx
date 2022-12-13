import { createContext, useState, useEffect } from "react";
import userService from "../services/userService";


const Context = createContext()

  const user = {
  userId: '',
  name: '',
  surname: '',
  email: '',
  password: '',
  role: '',
} 


const UserContextProvider = ({children}) => {
  const [authUser, setAuthUser] = useState();

  const onLoginClicked = (e, values) => {
    if(values.email === user.email && values.password === user.password){
      window.localStorage.setItem("user", JSON.stringify(user))
      setAuthUser(user);
      return true
    } else {return false}
  }

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



