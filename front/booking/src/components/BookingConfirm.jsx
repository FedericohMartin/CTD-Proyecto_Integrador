import React from "react";
import { BsPatchCheckFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import homeStyles from '../styles/home.module.css'
import styles from '../styles/bookingConfirm.module.css'

function BookingConfirm(){
    const navigate = useNavigate()

    const goToPage = () => {
        navigate('/');
     }

    return(
        <div className={`${homeStyles.container} ${styles.confirmContainer}`}>
            <div>
                <BsPatchCheckFill className={styles.bookingConfirmIcon}/>
                <div>
                    <h4>¡Muchas gracias!</h4>
                    <h5>Su reserva se ha realizado con éxito</h5>
                </div>
                <button onClick={goToPage}>ok</button>
            </div>
        </div>
    )
}

export default BookingConfirm;