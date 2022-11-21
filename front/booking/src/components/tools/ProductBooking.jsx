import React, { useContext } from "react";
import citiesService from "../../services/citiesService";
import moment from 'moment'
import CalendarSearch from "./CalendarSearch";
import {Context} from '../../contexts/UserContext';
import styles from '../../styles/productBooking.module.css';
import {FaRegCheckCircle} from "react-icons/fa";
import {MdLocationOn } from 'react-icons/md';
import { useState } from "react";
import { useEffect } from "react";

const hours = Array.from({length: 24}, (_, i) => {let a = i-1 
                                                return`${a + 1}:00`})

const excludeDates = [new Date(), new Date("2022-11-30 EDT"), new Date("2022-12-17 EDT")]

function ProductBooking({product}){
    const [bookingFormData, setBookingFormData] = useState({
        name: "",
        lastName: "",
        email: "",
        city: "",
        startDate: null,
        endDate: null,
        arrivalHour: "",
    });
    const [cities, setCities] = useState([]);
    const [maxDateDatepicker, setMaxDateDatepicker] = useState(null);
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

     const onClearDatesClicked = () => {
        setBookingFormData((prevState) => {
            return {...prevState, startDate: null, endDate: null};
        })

        setMaxDateDatepicker(null);
     }
     const onDateChange = (dates) => {
        const [start, end] = dates;

        setBookingFormData((prevState) => {
            return {...prevState, startDate: start};
        })

        if (end == null) {
            setBookingFormData((prevState) => {
                return {...prevState, endDate: end};
            })

            if (bookingFormData.startDate != null && start.toString() === bookingFormData.startDate.toString()) {
                setBookingFormData((prevState) => {
                    return {...prevState, startDate: null};
                })
                setMaxDateDatepicker(null);
            } else if (excludeDates.length > 0) {
                for (const date of excludeDates) {
                    if (moment(new Date(date)).isAfter(new Date(start))) {
                        setMaxDateDatepicker(new Date(date));
                        break;
                    }
                }
            }
        } else if (start.toString() !== end.toString()) {
            setBookingFormData((prevState) => {
                return {...prevState, endDate: end};
            })

            setMaxDateDatepicker(end);
        }
        
     }

    const cityMapper = (cities) => (
        <option key={`city-${cities.id}`} value= {cities.id}>{cities.name} - {cities.state} - {cities.country}   </option>)

    const hoursMapper = (hour) => (<option key={`hour-${hour}`} value={hour}>{hour}</option>)

    useEffect(() => {
        if(authUser){
            setBookingFormData((prevState) => {
                return {...prevState, ...authUser, password: null};
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
                        <CalendarSearch 
                            inlineProp={'inline'} 
                            productCalendar='calendar bookingCalendar'
                            onParentDateChange={onDateChange} 
                            startDate={bookingFormData.startDate} 
                            endDate={bookingFormData.endDate}
                            maxDateDatepicker={maxDateDatepicker}
                            excludeDates={excludeDates}
                        ></CalendarSearch>
                        <div className={styles.clear} onClick={onClearDatesClicked}>Borrar selección</div>
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
                        <div>Fecha de entrega: {bookingFormData.startDate?.toLocaleDateString()}</div>
                        <hr />
                        <div>Fecha de devolución: {bookingFormData.endDate?.toLocaleDateString()}</div>
                        <hr />
                        <button type="submit">Confirmar reserva</button>
                    </div>   
                </div>
            </form>
        </>
    )
}

export default ProductBooking;