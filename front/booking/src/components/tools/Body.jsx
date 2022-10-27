import React from "react";
import styles from '../../styles/body.module.css'
import Searchbox from "./Searchbox";

function Body(){

    return(
        <div className={styles.bodyContainer}>
            <Searchbox></Searchbox>
        </div>
    )
}


export default Body;