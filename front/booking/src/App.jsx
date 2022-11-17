import './App.css';
import Home from './components/Home';
import Header from './components/tools/Header';
import Footer from './components/tools/Footer';
import homeStyles from './styles/home.module.css'
import Login from './components/Login';
import Register from './components/Register';
import Product from './components/Product';
import ProductDetail from './components/tools/ProductDetail';
import Menu from './components/tools/Menu';
import {UserContextProvider} from './contexts/UserContext'
import { useEffect, useState } from 'react';
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
      window.localStorage.setItem("user", JSON.stringify(user))
      setAuthUser(user);
      return true
    } else {return false}
  }

  const onLogoutClicked = () => {
    localStorage.removeItem("user");
    setAuthUser(defaultUser);
  }

  useEffect(() => {
    if(localStorage.getItem("user")){
      setAuthUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [])

  return (
    <div className="App">
      <UserContextProvider user={authUser}>
        <BrowserRouter>
          <Header onMenuParentClicked={onMenuClicked} onParentLogoutClicked={onLogoutClicked}></Header>
          <div onClick={onCloseClicked} className={`${homeStyles.opacity} ${!hideMenu && homeStyles.darken} ${homeStyles.disableMenu}`}></div>  
          <Menu onParentCloseClicked={onCloseClicked} show={hideMenu} onParentLogoutClicked={onLogoutClicked}></Menu>
          <Routes>
            <Route path="/" element={<Home onGParentCloseClicked= {onCloseClicked} show={hideMenu}/>}> </Route>
            <Route path='/login' element={<Login onParentSubmitClicked={onLoginClicked}/>}></Route>
            <Route path='/signup' element={<Register/>}></Route>
            <Route path='producto'>
              <Route path=':idProducto' element={<Product>
                                                  {product => <ProductDetail product={product}/>}
                                                </Product>}></Route>
            </Route>
          </Routes>
          <Footer></Footer>
        </BrowserRouter>
      </UserContextProvider>
    </div>
  );
}

export default App;
