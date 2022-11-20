import React, { useContext } from "react";
import citiesService from "../../services/citiesService";
import {Context} from '../../contexts/UserContext';
import styles from '../../styles/productBooking.module.css'
import {MdLocationOn } from 'react-icons/md'
import { useState } from "react";
import { useEffect } from "react";

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
                            <select className={styles.inputSearch} onChange={onFormFieldChange} id="cities" name="city">
                                <option id="title" className={styles.selected} value='null'>
                                    ¿En cuál ciudad querés pistear?
                                </option>
                                {cities.map(cityMapper)}
                            </select>
                        </div>
                    </div>
                    <div className={styles.dateContainer}></div>
                    <div className={styles.timeContainer}></div>
                </div>
                <div className={styles.bookingDetails}>
                    <div className={styles.titleCard}>
                        <h2>Detalle de reserva</h2>
                        <img src={product?.category?.imgUrl} alt="" />
                    </div>
                    <div className={styles.detailsCard}>
                        <div>
                            <h4>{product?.category?.title}</h4>
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