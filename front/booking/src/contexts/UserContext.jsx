import { createContext, useState, useEffect } from "react";

const Context = createContext()

const user = {
  userId: 2,
  name: "Pedro",
  lastName: "Picapiedra",
  email: "pedro.p@domain.com",
  password: "pedrit0elMejor"
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