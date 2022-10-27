import React from "react";
import styles from "../styles/home.module.css"
import Searchbox from "./tools/Searchbox";

function Home(){

    return(
        <div className={styles.container}>
            <Searchbox></Searchbox>
        </div>
    )
}

export default Home;