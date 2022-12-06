import React, {useContext} from "react";
import styles from '../../styles/menu.module.css'
import iconFB from '../../img/iconFBMobile.png'
import iconIG from '../../img/iconIGMobile.png'
import iconLI from '../../img/iconLIMobile.png'
import iconTW from '../../img/iconTWMobile.png'
import {Context} from '../../contexts/UserContext'
import closeIcon from '../../img/X.png'
import { Link } from "react-router-dom";

const getInitials = (stringChain) => {
    let arrayOfWords = stringChain.split(" ");
    let initials = "";
    for (let i = 0; i < arrayOfWords.length; i++) {
        const element = arrayOfWords[i].substring(0,1);
        initials += element.toUpperCase();        
    }
    return initials;
}

function Menu(props){
    const {authUser, onLogoutClicked} = useContext(Context);

    const onLocalCloseClicked = () => {
        props.onParentCloseClicked();
    }

    const onLocalLogoutClicked = () => {
      onLogoutClicked();
    }

    return(
        <div className={`${styles.container} ${props.show ? styles.hide : styles.show} ${styles.disableMenu}`}>
            <header className={styles.menuHeader}>
                <img onClick={onLocalCloseClicked} className={styles.close} src={closeIcon} alt="Close Icon" />
                {authUser?.name ? 
                  <div className={styles.nameItem}>
                    <div id={styles.avatar}>{getInitials(`${authUser?.name} ${authUser?.lastName}`)}</div>
                    <div>Hola, </div>
                    <div>{` ${authUser?.name} ${authUser?.lastName}`}</div>
                  </div> 
                  :<div>MENÚ</div>}
            </header>
            {authUser?.name ?
              <div className={styles.userMenuBody}>
                {authUser?.role === "ADMIN" && 
                    <div>
                      <Link to={"/administracion"}>Administración</Link>
                    </div> }
                <div className={styles.logout}>
                  <div>¿Deseas <Link onClick={onLocalLogoutClicked}>cerrar sesión</Link>?</div>
                  <hr className={styles.separator}/>
                </div>
              </div>
            : <div className={styles.menuBody}>
                <Link to={"/signup"} type="Link">Crear cuenta</Link>
                <hr className={styles.separator}/>
                <Link to={"/login"} type="Link">Iniciar sesión</Link>
              </div>}
            <div className={styles.menuFooter} >
                <Link to={"/"}><img src={iconFB} alt="Facebook icon" /></Link>
                <Link to={"/"}><img src={iconIG} alt="Instagram icon" /></Link>
                <Link to={"/"}><img src={iconLI} alt="Linkedin icon" /></Link>
                <Link to={"/"}><img src={iconTW} alt="Twitter icon" /></Link>
            </div>
        </div>
    )
}

export default Menu;