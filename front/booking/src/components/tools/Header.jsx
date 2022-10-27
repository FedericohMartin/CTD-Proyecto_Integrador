import React from "react";
import logo from '../../img/logo-1.png'
import menuIcon from '../../img/menu-i.png'
import styles from '../../styles/header.module.css'
import {FaRegWindowClose} from 'react-icons/fa';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

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
    const onLocalMenuClicked = () => {
        props.onMenuParentClicked();
    }

    const onLocalLogoutClicked = () => {
        props.onParentLogoutClicked();
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
            {props.user.name 
                ? <div className={styles.headerItem}>
                    <div className={styles.hide}>{`Hola, ${props.user?.name} ${props.user?.lastName}`}</div>
                    <div id={styles.avatar}>{getInitials(`${props.user?.name} ${props.user?.lastName}`)}</div>
                    <FaRegWindowClose className={styles.logoutIcon} onClick={onLocalLogoutClicked} />
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