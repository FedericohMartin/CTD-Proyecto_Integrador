import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import citiesService from "../../services/citiesService";
import bookingService from "../../services/bookingService";
import moment from 'moment'
import CalendarSearch from "./CalendarSearch";
import {Context} from '../../contexts/UserContext';
import styles from '../../styles/productBooking.module.css';
import {FaRegCheckCircle} from "react-icons/fa";
import { IoAlertCircleOutline } from "react-icons/io5";
import {MdLocationOn } from 'react-icons/md';

const hours = Array.from({length: 24}, (_, i) => {let a = i-1 
                                                return a<9 ? `0${a + 1}:00` : `${a + 1}:00`})
                                                
function ProductBooking({product, isLoaded, onSubmitclicked}){
    const [bookingFormData, setBookingFormData] = useState({
        userId: "",
        name: "",
        lastName: "",
        email: "",
        city: "",
        initialDate: null,
        finalDate: null,
        hour: "",
        productId: "",
    });
    const [cities, setCities] = useState([]);
    const [maxDateDatepicker, setMaxDateDatepicker] = useState(null);
    const [bookedDates, setBookedDates] = useState([]);
    const [bookingFailed, setbookingFailed] =useState(false);
    const [validated, setValidated] = useState({
        initialDate: true,
        finalDate: true,
        hour: true,
    });
    const [submitClicked, setSubmitClicked] = useState(false);
    const [nextDayBlocked, setNextDayBlocked] = useState(false);
    const {authUser} = useContext(Context);
    const navigate = useNavigate();

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
            return {...prevState, initialDate: null, finalDate: null};
        })
        setNextDayBlocked(false);
        setMaxDateDatepicker(null);
     }

    const onDateChange = (dates) => {
        const [start, end] = dates;

        setBookingFormData((prevState) => {
            return {...prevState, initialDate: start};
        })

        if (end == null) {
            setBookingFormData((prevState) => {
                return {...prevState, finalDate: end};
            })

            if (bookingFormData.initialDate != null) {
                setBookingFormData((prevState) => {
                    return {...prevState, initialDate: null};
                })
                setMaxDateDatepicker(null);
            } else if (bookedDates?.length > 0) {
                for (const date of bookedDates) {
                    const bookedStartDate = new Date(date.start);
                    if (moment(bookedStartDate).isAfter(new Date(start))) {
                        const tomorrow = new Date(start+1);
                        if(moment(bookedStartDate).isSame(tomorrow, 'day')){
                            setNextDayBlocked(true);
                        }
                        setMaxDateDatepicker(new Date(date.start));
                        break;
                    }
                }
            }
        } else if (start.toString() !== end.toString()) {
            setBookingFormData((prevState) => {
                return {...prevState, finalDate: end};
            })

            setMaxDateDatepicker(end);
        }
        
     }

    const cityMapper = (cities) => (
        <option key={`city-${cities.id}`} value= {cities.id}>{cities.name} - {cities.state} - {cities.country}   </option>)

    const hoursMapper = (hour) => (<option key={`hour-${hour}`} value={hour}>{hour}</option>)

    const onSaveBookingClicked = async (e) =>{
        e.preventDefault();
        setSubmitClicked(true);
        onSubmitclicked();
        setValidated(prevState =>{
            return {...prevState, initialDate: !bookingFormData.initialDate ? false : true}
        })

        setValidated(prevState =>{
            return {...prevState, finalDate: !bookingFormData.finalDate ? false : true}
        })

        setValidated(prevState =>{
            return {...prevState, hour: !bookingFormData.hour ? false : true}
        })

        if(validated.finalDate && validated.initialDate && validated.hour){
            const payload = {...bookingFormData, initialDate: bookingFormData.initialDate.toISOString().split('T')[0], finalDate: bookingFormData.finalDate.toISOString().split('T')[0]}
            const bookingPromise = await bookingService.add(payload);

            if(bookingPromise.data){
                console.log(bookingPromise);
                navigate('booking-confirm'); 
            }else{
                setbookingFailed(true);
                onSubmitclicked();
            }
        }
    }

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

        if(product.id){
            setBookingFormData(prevState => {
                return {...prevState, productId:product.id }
            })

            bookingService
            .getBookingsByProdId(product.id)
            .then(response => {
                const datesArray = response.data?.map(item => {
                    const initialDate = new Date(`${item.initialDate} EDT`);
                    return {
                        start: initialDate.setDate(initialDate.getDate() - 1),
                        end: new Date(`${item.finalDate} EDT`)
                    }
                })
                setBookedDates(datesArray);
            })
            .catch(error => console.log(error))
        }

    }, [bookingFormData.productId, product]);

    useEffect(() => {
        if(submitClicked){
            setValidated(prevState =>{
                return {...prevState, initialDate: !bookingFormData.initialDate ? false : true}
            })
    
            setValidated(prevState =>{
                return {...prevState, finalDate: !bookingFormData.finalDate ? false : true}
            })
    
            setValidated(prevState =>{
                return {...prevState, hour: !bookingFormData.hour ? false : true}
            })
        }
    }, [bookingFormData.initialDate, bookingFormData.finalDate, bookingFormData.hour, submitClicked])

    return(
        <>
            <form className={styles.bookingContainer}>
                <div className={styles.bookFormContainer}>
                    <h2>Completá tus datos</h2>
                    {isLoaded
                    ?<div className={styles.dataContainer}>
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
                    : <div className={styles.dataLoader}></div>}  
                    <h2>Seleccioná tu fecha de reserva</h2>
                    {isLoaded
                    ?<div className={`${styles.dateContainer} ${!(validated.initialDate && validated.finalDate) && styles.missingDataContainer}`}>
                        <CalendarSearch 
                            inlineProp={'inline'} 
                            productCalendar='calendar bookingCalendar'
                            onParentDateChange={onDateChange} 
                            startDate={bookingFormData.initialDate} 
                            endDate={bookingFormData.finalDate}
                            maxDateDatepicker={maxDateDatepicker}
                            excludeDates={bookedDates}
                        ></CalendarSearch>
                        <div className={styles.clear} onClick={onClearDatesClicked}>Borrar selección</div>
                     </div>
                    : <div className={styles.dateLoader}></div>}
                    {!(validated.initialDate && validated.finalDate) && <span className={styles.missingDataWarning}>Debes seleccionar un rango de fechas</span>}
                    <h2>Tu horario de llegada</h2>
                    {isLoaded
                    ?<div className={styles.timeContainer}>
                        <div>
                            <FaRegCheckCircle className={styles.hourIcon}/>
                            <div>Tu vehículo estará esperándote en el aeropuerto de la ciudad</div>
                        </div>
                        <div className={styles.arrivalHour}>
                            <label htmlFor="arrivalHour">Incicá tu horario estimado de llegada</label>
                            <select onChange={onFormFieldChange} id="arrivalHour" name="hour" value={bookingFormData.hour} className={`${!validated.hour && styles.missingDataContainer}`}>
                                <option id="title" value='null'>
                                    Seleccionar hora de llegada
                                </option>
                                {hours.map(hoursMapper)}
                            </select>
                        </div>
                        {!validated.hour && <span className={styles.missingDataWarning}>Debes seleccionar un horario de llegada</span>}
                    </div>
                    : <div className={styles.hourLoader}></div>}
                </div>
                {isLoaded
                ?<div className={styles.bookingDetails}>
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
                        <div>Fecha de entrega: {bookingFormData.initialDate?.toLocaleDateString()}</div>
                        {nextDayBlocked && <span className={styles.missingDataWarning}>Fecha válida sólo para devolución</span>}
                        <hr />
                        <div>Fecha de devolución: {bookingFormData.finalDate?.toLocaleDateString()}</div>
                        <hr />
                        <button type="submit" onClick={onSaveBookingClicked}>Confirmar reserva</button>
                        {bookingFailed && <span><IoAlertCircleOutline className={styles.alertIcon}/>Lamentablemente la reserva no ha podido realizarse. Por favor, intente más tarde</span>}
                    </div>   
                 </div>
                : <div className={styles.detailLoader}></div>}
            </form>
        </>
    )
}

export default ProductBooking;