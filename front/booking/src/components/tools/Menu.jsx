import React from "react";
import styles from '../../styles/menu.module.css'
import iconFB from '../../img/iconFBMobile.png'
import iconIG from '../../img/iconIGMobile.png'
import iconLI from '../../img/iconLIMobile.png'
import iconTW from '../../img/iconTWMobile.png'
import closeIcon from '../../img/X.png'
import { Link } from "react-router-dom";

function Menu(props){
    const onLocalCloseClicked = () => {
        props.onParentCloseClicked();
    }

    return(
        <div className={`${styles.container} ${props.show && styles.hide} ${!props.show && styles.show}`}>
            <header className={styles.menuHeader}>
                <img onClick={onLocalCloseClicked} className={styles.close} src={closeIcon} alt="Close Icon" />
                <div>MENÚ</div>
            </header>
            <div className={styles.menuBody}>
                <Link to={"/signup"} type="Link">Crear cuenta</Link>
                <hr className={styles.separator}/>
                <Link to={"/login"} type="Link">Iniciar sesión</Link>
            </div>
            <div className={styles.menuFooter} style={{marginRight: "1.1875rem"}}>
                <Link to={"/"}><img src={iconFB} alt="Facebook icon" /></Link>
                <Link to={"/"}><img src={iconIG} alt="Instagram icon" /></Link>
                <Link to={"/"}><img src={iconLI} alt="Linkedin icon" /></Link>
                <Link to={"/"}><img src={iconTW} alt="Twitter icon" /></Link>
            </div>
        </div>
    )
}

export default Menu;