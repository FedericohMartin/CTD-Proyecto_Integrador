import React, { useContext } from "react";
import citiesService from "../../services/citiesService";
import CalendarSearch from "./CalendarSearch";
import {Context} from '../../contexts/UserContext';
import styles from '../../styles/productBooking.module.css';
import {FaRegCheckCircle} from "react-icons/fa";
import {MdLocationOn } from 'react-icons/md';
import { useState } from "react";
import { useEffect } from "react";

const hours = Array.from({length: 24}, (_, i) => {let a = i-1 
                                                return`${a + 1}:00`})


function ProductBooking({product}){
    const [bookingFormData, setBookingFormData] = useState({
        name: "",
        lastName: "",
        email: "",
        city: "",
        dateStart: "",
        dateEnd: "",
        arrivalHour: "",
    });
    const [cities, setCities] = useState([]);
    const {authUser} = useContext(Context);

    const onFormFieldChange = (event) => {
        const target = event.target;
  
        const newUserValue = target.value;
  
        const nameOfField = target.name;
  
        setBookingFormData((prevState) => {
           const updatedFormData = {
              ...prevState,
           };
              updatedFormData[nameOfField] = newUserValue;
  
           return updatedFormData;
        });
     };

    const cityMapper = (cities) => (
        <option key={`city-${cities.id}`} value= {cities.id}>{cities.name} - {cities.state} - {cities.country}   </option>)

    const hoursMapper = (hour) => (<option key={`hour-${hour}`} value={hour}>{hour}</option>)

    useEffect(() => {
        if(authUser){
            setBookingFormData((prevState) => {
                return {...prevState, ...authUser};
            })
        }
    }, [authUser]);

    useEffect(() => {
        citiesService
        .getAll()
        .then((response) => {
            setCities(response.data);
        })
        .catch(error => console.log(error))

    }, []);


    return(
        <>
            <form className={styles.bookingContainer}>
                <div className={styles.bookFormContainer}>
                    <h2>Completá tus datos</h2>
                    <div className={styles.dataContainer}>
                        <div>
                            <label htmlFor="name">Nombre</label>
                            <input type="text" value={bookingFormData?.name} onChange={onFormFieldChange} name="name" disabled/>
                        </div>
                        <div>
                            <label htmlFor="lastName">Apellido</label>
                            <input type="text" value={bookingFormData?.lastName} onChange={onFormFieldChange} name="lastName" disabled/>
                        </div>
                        <div>
                            <label htmlFor="email">Correo electronico</label>
                            <input type="text" value={bookingFormData?.email} onChange={onFormFieldChange} name="email" disabled/>
                        </div>
                        <div>
                            <label htmlFor="city">Ciudad</label>
                            <select onChange={onFormFieldChange} id="cities" name="city">
                                <option id="title" value='null'>
                                    ¿En cuál ciudad querés pistear?
                                </option>
                                {cities.map(cityMapper)}
                            </select>
                        </div>
                    </div>
                    <h2>Seleccioná tu fecha de reserva</h2>
                    <div className={styles.dateContainer}>
                    <CalendarSearch inlineProp={'inline'} productCalendar='calendar'></CalendarSearch>
                    </div>
                    <h2>Tu horario de llegada</h2>
                    <div className={styles.timeContainer}>
                        <div>
                            <FaRegCheckCircle className={styles.hourIcon}/>
                            <div>Tu vehículo estará esperándote en el aeropuerto de la ciudad</div>
                        </div>
                        <div className={styles.arrivalHour}>
                            <label htmlFor="arrivalHour">Incicá tu horario estimado de llegada</label>
                            <select onChange={onFormFieldChange} id="arrivalHour" name="arrivalHour">
                                <option id="title" value='null'>
                                    Seleccionar hora de llegada
                                </option>
                                {hours.map(hoursMapper)}
                            </select>
                        </div>
                    </div>
                </div>
                <div className={styles.bookingDetails}>
                    <div className={styles.titleCard}>
                        <h2>Detalle de reserva</h2>
                        <img src={product?.category?.imgUrl} alt="" />
                    </div>
                    <div className={styles.detailsCard}>
                        <div>
                            <h4>{product?.category?.title?.toUpperCase()}</h4>
                            <h2>{product?.title}</h2>
                        </div>
                        <div className={styles.location}>
                            <MdLocationOn className={styles.locationIcon}/>
                            {`${product.location?.state}, ${product.location?.name}, ${product.location?.country}`}
                        </div>
                        <hr />
                        <div>Fecha de entrega:</div>
                        <hr />
                        <div>Fecha de devolución:</div>
                        <hr />
                        <button type="submit">Confirmar reserva</button>
                    </div>   
                </div>
            </form>
        </>
    )
}

export default ProductBooking;