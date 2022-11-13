import { createContext } from "react";

const Context = createContext()

const UserContextProvider = ({children, user}) => {

  return (
      <Context.Provider value={{user}}>
          {children}
      </Context.Provider>
  )
}

export {Context, UserContextProvider};