import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import bookingService from "../../services/bookingService";
import CalendarSearch from "./CalendarSearch";
import styles from '../../styles/bookingChart.module.css'

function BookingChart({product, isLoaded}){
    const [bookedDates, setBookedDates] = useState([]);
    const navigate = useNavigate();
    const onBookingClicked = () => {
        navigate('reserva');
    }

    useEffect(() => {
        if(product.id){
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
    }, [product]);


    return(
        <div className={styles.chartContainer}>
            <div className={styles.calendarContainer}>
                <h2>Fechas disponibles</h2>
                {isLoaded
                ?<CalendarSearch inlineProp={'inline'} productCalendar='calendar' excludeDates={bookedDates}></CalendarSearch>
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