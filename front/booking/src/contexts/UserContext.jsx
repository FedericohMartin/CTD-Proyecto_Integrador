import { createContext, useState, useEffect } from "react";

const Context = createContext()

const user = {
  jwt: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJTY2Fsb25ldGE3NyIsImV4cCI6MTY3MDYxMzQ3MSwiaWF0IjoxNjcwNjA3NDcxfQ.45uMJ1niEagavT8DkjNtcpCiYjxevA8rIDLhrVOgVrY",
  userId: 2,
  name: "Pedro",
  surname: "Picapiedra",
  email: "pedro.p@domain.com",
  password: "pedrit0elMejor",
  role: "ADMIN",
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