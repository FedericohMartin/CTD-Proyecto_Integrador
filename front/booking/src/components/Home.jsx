import React from "react";
import styles from '../styles/home.module.css'
import Header from "./tools/Header";
import Body from "./tools/Body";
import Footer from "./tools/Footer";


function Home(props){

    return(
        <>
            <div className={styles.opacity}></div>
            <Header user={props.user}></Header>
            <Body></Body>
            <Footer></Footer>
        </>
    )
}

export default Home;