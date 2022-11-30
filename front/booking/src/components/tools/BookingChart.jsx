import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import CalendarSearch from "./CalendarSearch";
import styles from '../../styles/bookingChart.module.css'

function BookingChart({product, isLoaded, bookedDates}){
    const [tempBookedDates, setTempBookedDates] = useState([]);
    const [excludedDates, setExcludedDates] = useState([]);
    const navigate = useNavigate();
    const onBookingClicked = () => {
        navigate('reserva');
    }

    useEffect(() => {
        setTempBookedDates([])
    }, [product]);

    useEffect(() => {
        if(bookedDates) {
            setExcludedDates(bookedDates.concat(tempBookedDates));
        }
    }, [bookedDates, tempBookedDates]);


    return(
        <div className={styles.chartContainer}>
            <div className={styles.calendarContainer}>
                <h2>Fechas disponibles</h2>
                {isLoaded
                ?<CalendarSearch inlineProp={'inline'} productCalendar='calendar' excludeDates={excludedDates}></CalendarSearch>
                : <div className={styles.calendarLoader}></div>}
            </div>
            <div className={styles.buttonContainer}>
                <div >Agregá tus fechas de viaje para obtener precios exactos</div>
                <button onClick={onBookingClicked}>Iniciar reserva</button>
            </div>
        </div>
    )
}

export default BookingChart;