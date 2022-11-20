import React from "react";
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
    const {user} = useContext(Context);

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

    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerItem}>
                <Link to={"/"}><img src={logo} alt="Logo" /></Link>
                <Link to={"/"} style={{ textDecoration: 'none' }}><div className={`${styles.hide} ${styles.hideT}`}>Some awesome slogan</div></Link>
            </div>
            {user?.name 
                ? <div className={styles.nameItem}>
                    <div className={styles.hide} id={styles.avatar}>{getInitials(`${user?.name} ${user?.lastName}`)}</div>
                    <div className={styles.hide}>Hola, <br/> <span>{` ${user?.name} ${user?.lastName}`}</span></div>
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