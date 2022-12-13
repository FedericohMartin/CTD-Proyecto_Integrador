import { createContext, useState, useEffect } from "react";
import userService from "../services/userService";


const Context = createContext()

const user = {
  jwt: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJTY2Fsb25ldGE3NyIsImV4cCI6MTY3MDkwMjQ0MywiaWF0IjoxNjcwODk2NDQzfQ.DuvZ07EgahcZ1JZEQBrb0ogLNcdg38iJQq67UajrsN4",
  id: 2,
  name: "Pedro",
  surname: "Picapiedra",
  userEmail: "pedro.p@domain.com",
  password: "pedrit0elMejor",
  role: "USER",
}


const UserContextProvider = ({children}) => {
  const [authUser, setAuthUser] = useState();

  const onLoginClicked = (e, values) => {
    if(values.email === user.userEmail && values.password === user.password){
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



