import React, { useState, useEffect } from "react";
import styles from "../../styles/searchbox.module.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Calendar from "./CalendarSearch";
import citiesService from "../../services/citiesService"; 
 
 /* Y otra cosita! No te olvides de agregar la key */

function Searchbox(){
    const [cities, setCities] = useState([]);

    const cityMapper = (cities) => (

        <option key={`city-${cities.id}`} value= {cities.id}>{cities.name} - {cities.state} - {cities.country}   </option>

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
