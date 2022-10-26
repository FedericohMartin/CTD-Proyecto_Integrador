import './App.css';
import Home from './components/Home';
import Header from './components/tools/Header';
import Footer from './components/tools/Footer';
import homeStyles from './styles/home.module.css'
import Login from './components/Login';
import Menu from './components/tools/Menu';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  const [hideMenu, setHideMenu] = useState(true);

  const onMenuClicked = () => {
    setHideMenu(false);
  }

  const onCloseClicked = () => {
    setHideMenu(true);
  }

  return (
    <div className="App">
      
        <BrowserRouter>
          <Header user={""} onMenuParentClicked={onMenuClicked}></Header>
          <div onClick={onCloseClicked} className={`${homeStyles.opacity} ${!hideMenu && homeStyles.darken}`}></div>  
          <Menu onParentCloseClicked={onCloseClicked} show={hideMenu}></Menu>
          <Routes>
            <Route path="/" element={<Home onGParentCloseClicked= {onCloseClicked} show={hideMenu}/>}> </Route>
            <Route path='/login' element={<Login/>}></Route>
          </Routes>
          <Footer></Footer>
        </BrowserRouter>
      
    </div>
  );
}

export default App;
