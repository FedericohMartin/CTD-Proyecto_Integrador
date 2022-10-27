import React, { useState } from "react";
import styles from "../../styles/searchbox.module.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Calendar from "./CalendarSearch";
import {argCities} from "../../data/cities"

function Searchbox(){

    const [startDate, setStartDate] = useState(new Date());

    return(
        <div className={styles.searchbox}>
            <h1>Busca ofertas en Automoviles</h1>
            
            <form id="form" className={styles.container}>
                <div className={styles.formCities}>
                    <select className={styles.inputSearch} id="citys" data-testid="custom-element">
                        <option id="title" className={styles.selected} value='null'>
                            ¿En cuál ciudad querés pistear?
                        </option>

                        {argCities.map(city => 
                            <option value={city.name}>{city.name} - {city.code}</option>
                        )}

                    </select>
                </div>
                <Calendar/>

                <button className={styles.buttonSearch} type="submit">
                    Buscar
                </button>
            </form>
        </div>
    )

}

export default Searchbox;