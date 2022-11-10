import React, { useState, useEffect } from "react";
import styles from "../../styles/searchbox.module.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Calendar from "./CalendarSearch";
import citiesService from "../../services/citiesService"; 

function Searchbox(){
    const [cities, setCities] = useState([]);

    const cityMapper = (cities) => (

        <option value= {cities.name}>{cities.name} - {cities.state} - {cities.country} {cities.id}</option>
        
    )

        useEffect(() => {
            citiesService
            .getAll()
            .then((response) => {
                setCities(response.data);
            })
    
        }, []);

    
    return(
        <div className={styles.searchbox}>
            <h1>Busca ofertas en Automoviles</h1>
            
            <form id="form" className={styles.container}>
                <div className={styles.formCities}>
                    <select className={styles.inputSearch} id="cities">
                        {cities.map(cityMapper)}
                        <option id="title" className={styles.selected} value='null'>
                            ¿En cuál ciudad querés pistear?
                        </option>

                        {cities.map(cityMapper)}

                    </select>
                </div>
                <Calendar className={styles.calendar}/>

                <button className={styles.buttonSearch} type="submit">
                    Buscar
                </button>
            </form>
        </div>
    )

}

export default Searchbox;
