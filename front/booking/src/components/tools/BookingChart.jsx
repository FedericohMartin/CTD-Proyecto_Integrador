import React from "react";
import { useNavigate } from "react-router-dom";
import CalendarSearch from "./CalendarSearch";
import styles from '../../styles/bookingChart.module.css'

function BookingChart(){
    const navigate = useNavigate();
    const onBookinClicked = () => {
        navigate('reserva');
    }

    return(
        <div className={styles.chartContainer}>
            <div className={styles.calendarContainer}>
                <h2>Fechas disponibles</h2>
                <CalendarSearch inlineProp={'inline'} productCalendar='calendar'></CalendarSearch>
            </div>
            <div className={styles.buttonContainer}>
                <div >Agregá tus fechas de viaje para obtener precios exactos</div>
                <button onClick={onBookinClicked}>Iniciar reserva</button>
            </div>
        </div>
    )
}

export default BookingChart;