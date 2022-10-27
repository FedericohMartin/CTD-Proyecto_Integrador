import './App.css';
import Home from './components/Home';
import Header from './components/tools/Header';
import Footer from './components/tools/Footer';
import homeStyles from './styles/home.module.css'
import Login from './components/Login';
import Register from './components/Register';
import Menu from './components/tools/Menu';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const user = {
  name: "Pedro",
  lastName: "Picapiedra",
  email: "pedro.p@domain.com",
  password: "pedrit0elMejor"
}

function App() {
  const defaultUser = {
    name: "",
    lastName: "",
    email: "",
    password: ""
  }
  const [hideMenu, setHideMenu] = useState(true);
  const [authUser, setAuthUser] = useState(defaultUser)

  const onMenuClicked = () => {
    setHideMenu(false);
  }

  const onCloseClicked = () => {
    setHideMenu(true);
  }

  const onLoginClicked = (e, values) => {
    if(values.email === user.email && values.password === user.password){
      setAuthUser(user);
      return true
    } else {return false}
  }

  const onLogoutClicked = () => {
    setAuthUser(defaultUser);
  }

  return (
    <div className="App">
      
        <BrowserRouter>
          <Header user={authUser} onMenuParentClicked={onMenuClicked} onParentLogoutClicked={onLogoutClicked}></Header>
          <div onClick={onCloseClicked} className={`${homeStyles.opacity} ${!hideMenu && homeStyles.darken}`}></div>  
          <Menu onParentCloseClicked={onCloseClicked} show={hideMenu}></Menu>
          <Routes>
            <Route path="/" element={<Home onGParentCloseClicked= {onCloseClicked} show={hideMenu}/>}> </Route>
            <Route path='/login' element={<Login onParentSubmitClicked={onLoginClicked} user={authUser}/>}></Route>
            <Route path='/signup' element={<Register/>}></Route>
          </Routes>
          <Footer></Footer>
        </BrowserRouter>
      
    </div>
  );
}

export default App;
