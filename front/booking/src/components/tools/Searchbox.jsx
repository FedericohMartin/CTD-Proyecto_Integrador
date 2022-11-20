import React, { useState, useEffect } from "react";
import styles from "../../styles/searchbox.module.css"
import "react-datepicker/dist/react-datepicker.css";
import Calendar from "./CalendarSearch";
import citiesService from "../../services/citiesService"; 

function Searchbox(props){
    const [formData, setFormData] = useState({
        city: "",
        dateRange: {
            startDate: null,
            endDate: null,
        },
     });
    const [cities, setCities] = useState([]);

    const onFormFieldChange = (event) => {
        const target = event.target;
  
        const newUserValue = target.value;
  
        const nameOfField = target.name;
   
        setFormData((prevState) => {
           const updatedFormData = {
              ...prevState,
           };
              updatedFormData[nameOfField] = newUserValue;    
           return updatedFormData;
        });
     };

    const onDateChange = (dates) => {

        const [startDate, endDate] = dates
        setFormData((prevState) => {
            const update = {...prevState};

            update.dateRange.startDate = startDate;
            update.dateRange.endDate = endDate;

            return update;
        })
     }

    const onLocalSubmitClicked = (e) => {
        e.preventDefault();
        props.onParentSubmitClicked(formData);
     }

    const cityMapper = (cities) => (
        <option key={`city-${cities.id}`} value= {cities.id}>{cities.name} - {cities.state} - {cities.country}   </option>)
         
    useEffect(() => {
        citiesService
        .getAll()
        .then((response) => {
            setCities(response.data);
        })
        .catch(error => console.log(error))

    }, []);

    return(
        <div className={styles.searchbox}>
            <h1>Busca ofertas en Automoviles</h1>
            
            <form id="form" className={styles.searchContainer} onChange={onFormFieldChange}>
                <div className={styles.formCities}>
                    <select className={styles.inputSearch} id="cities" name="city">
                        <option id="title" className={styles.selected} value='null'>
                            ¿En cuál ciudad querés pistear?
                        </option>

                        {cities.map(cityMapper)}

                    </select>
                </div>
                <Calendar className={styles.calendar} onParentDateChange={onDateChange} startDate={formData.dateRange.startDate} endDate={formData.dateRange.endDate}/>

                <button className={styles.buttonSearch} type="submit" onClick={onLocalSubmitClicked}>
                    Buscar
                </button>
            </form>
        </div>
    )

}

export default Searchbox;