import React, { useState, useEffect } from "react";
import logo from '../../img/logo-1.png'
import menuIcon from '../../img/menu-i.png'
import styles from '../../styles/header.module.css'
import {Context} from '../../contexts/UserContext'
import {FaRegWindowClose} from 'react-icons/fa';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";

const getInitials = (stringChain) => {
    let arrayOfWords = stringChain.split(" ");
    let initials = "";
    for (let i = 0; i < arrayOfWords.length; i++) {
        const element = arrayOfWords[i].substring(0,1);
        initials += element.toUpperCase();        
    }
    return initials;
}
    
function Header(props){
    const {authUser, onLogoutClicked} = useContext(Context);
    const [isLoaded, setIsLoaded] =useState(false);

    const onLocalMenuClicked = () => {
        props.onMenuParentClicked();
    }

    const onLocalLogoutClicked = () => {
        onLogoutClicked();
    }

    const navigate = useNavigate()

    const goToPage = (e) => {
        const targetPage = e.currentTarget.dataset.page;
        navigate(targetPage);
     }

     useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
          }, 1500);
          return () => clearTimeout(timer);
     }, []);

     if(!isLoaded){
        return(
            <header className={styles.headerContainer}>
            <div className={`${styles.headerItem} ${styles.loader}`}>
            </div>
            <div className={`${styles.headerItem} ${styles.loader}`}>
            </div>
        </header>
        )
     }
    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerItem}>
                <Link to={"/"}><img src={logo} alt="Logo" /></Link>
                <Link to={"/"} style={{ textDecoration: 'none' }}><div className={`${styles.hide} ${styles.hideT}`}>Pistea a tu estilo</div></Link>
            </div>
            {authUser?.name 
                ? <div className={styles.nameItem}>
                    {authUser?.role === "ADMIN" 
                    ? <div className={styles.admContainer}>
                        <div><Link to={"/administracion"} style={{ textDecoration: 'none' }}>Administración</Link></div>
                        <span className={styles.admSeparator}></span>
                    </div>
                    : <div className={styles.admContainer}>
                        <div><Link to={"/mis-reservas"} style={{ textDecoration: 'none' }}>Mis reservas</Link></div>
                        <span className={styles.admSeparator}></span>
                    </div>}
                    <div className={styles.hide} id={styles.avatar}>{getInitials(`${authUser?.name} ${authUser?.surname}`)}</div>
                    <div className={styles.hide}>Hola, <br/> <span>{` ${authUser?.name} ${authUser?.surname}`}</span></div>
                    <FaRegWindowClose className={`${styles.logoutIcon} ${styles.hide}`} onClick={onLocalLogoutClicked} />
                    <img onClick={onLocalMenuClicked} src={menuIcon} className={`${styles.btn} ${styles.menuIcon}`} alt="Menu-icon" />
                  </div> 
                : <div className={styles.headerItem}>
                    <button type="button" className={`${styles.btn} ${styles.hide}`} data-page="/signup" onClick={goToPage}>Crear cuenta</button>
                    <button type="button" className={`${styles.btn} ${styles.hide}`} data-page="/login" onClick={goToPage}>Iniciar sesión</button>
                    <img onClick={onLocalMenuClicked} src={menuIcon} className={`${styles.btn} ${styles.menuIcon}`} alt="Menu-icon" />
                </div>}
        </header>
    )    
}

export default Header;