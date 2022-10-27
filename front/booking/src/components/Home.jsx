import React from "react";
import styles from "../styles/home.module.css"
import Categories from "./tools/Categories";
import Searchbox from "./tools/Searchbox";


function Home() {

    return (
            <div className={styles.container}>
                <Searchbox></Searchbox>
                <Categories></Categories>
            </div>
    )
}

export default Home;