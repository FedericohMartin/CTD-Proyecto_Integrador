import React from "react";
import styles from '../../styles/footer.module.css'
import iconFB from '../../img/icon-facebook.png'
import iconIG from '../../img/icon-ig.png'
import iconLI from '../../img/icon-linkedin.png'
import iconTW from '../../img/tweet.png'
import { Link } from "react-router-dom";

function Footer(){

    return(
        <footer className={styles.footerContainer}>
            <div className={styles.footerItem}>©2021 Digital Booking</div>
            <div className={`${styles.footerItem} ${styles.hide} ${styles.tablet}`} style={{marginRight: "1.1875rem"}}>
                <Link to={"/"}><img src={iconFB} alt="Facebook icon" /></Link>
                <Link to={"/"}><img src={iconIG} alt="Instagram icon" /></Link>
                <Link to={"/"}><img src={iconLI} alt="Linkedin icon" /></Link>
                <Link to={"/"}><img src={iconTW} alt="Twitter icon" /></Link>
            </div>
        </footer>
    )
}


export default Footer;