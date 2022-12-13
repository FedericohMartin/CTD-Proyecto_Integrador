import './App.css';
import Home from './components/Home';
import Header from './components/tools/Header';
import Footer from './components/tools/Footer';
import homeStyles from './styles/home.module.css'
import Login from './components/Login';
import Register from './components/Register';
import Product from './components/Product';
import ProductDetail from './components/tools/ProductDetail';
import ProductBooking from './components/tools/ProductBooking';
import BookingConfirm from './components/BookingConfirm';
import Menu from './components/tools/Menu';
import {UserContextProvider} from './contexts/UserContext'
import {  useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from './components/ProtectedRoutes';
import ProtectedRoutesAdmin from './components/ProtectedRoutesAdmin';
import ProductForm from './components/ProductForm';
import MyBookings from './components/MyBookings';


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
      <UserContextProvider>
        <BrowserRouter>
          <Header onMenuParentClicked={onMenuClicked}></Header>
          <div onClick={onCloseClicked} className={`${homeStyles.opacity} ${!hideMenu && homeStyles.darken} ${homeStyles.disableMenu}`}></div>  
          <Menu onParentCloseClicked={onCloseClicked} show={hideMenu}></Menu>
          <Routes>
            <Route path="/" element={<Home onGParentCloseClicked= {onCloseClicked} show={hideMenu}/>}> </Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/signup' element={<Register/>}></Route>
            <Route path='/producto/:idProducto'element={<Product>
                                                          {(product, isLoaded, onSubmitclicked, bookedDates, isCalendarLoaded) => <ProductDetail 
                                                                                                                                    product={product} 
                                                                                                                                    isLoaded={isLoaded} 
                                                                                                                                    bookedDates={bookedDates}
                                                                                                                                    isCalendarLoaded={isCalendarLoaded}/>}
                                                        </Product>}>          
            </Route>
            <Route path='/producto/:idProducto' element={<ProtectedRoutes></ProtectedRoutes>}>
              <Route path='reserva' element={<Product>
                                                  {(product, isLoaded, onSubmitclicked, bookedDates, isCalendarLoaded) => <ProductBooking 
                                                                                                        product={product} 
                                                                                                        isLoaded={isLoaded} 
                                                                                                        onSubmitclicked={onSubmitclicked}
                                                                                                        bookedDates={bookedDates}
                                                                                                        isCalendarLoaded={isCalendarLoaded}/>}
                                              </Product>}>
              </Route>
            </Route>
            <Route path='/producto/:idProducto/reserva' element={<ProtectedRoutes></ProtectedRoutes>}>
              <Route path='reserva-exitosa' element={<BookingConfirm content={{
                                                                        title: "¡Muchas gracias!", 
                                                                        body: "Su reserva se ha realizado con éxito",
                                                                        button: "ok",
                                                                    }}/>}>
              </Route>
            </Route>
            <Route path='/administracion' element={<ProtectedRoutesAdmin></ProtectedRoutesAdmin>}>
              <Route path='' element={<ProductForm/>}>
              </Route>
              <Route path='producto-agregado-exitosamente' element={<BookingConfirm content={{
                                                                                      title: "", 
                                                                                      body: "Su producto se ha creado con éxito",
                                                                                      button: "volver",
                                                                                  }}/>}>
              </Route>
            </Route>
            <Route path='/mis-reservas' element={<ProtectedRoutes></ProtectedRoutes>}>
              <Route path='' element={<MyBookings/>}>
              </Route>
            </Route>
          </Routes>
          <Footer></Footer>
        </BrowserRouter>
      </UserContextProvider>
    </div>
  );
}

export default App;
