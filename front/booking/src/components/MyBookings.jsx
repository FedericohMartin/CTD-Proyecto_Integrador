import React, { useState, useEffect, useContext } from "react";
import moment from 'moment';
import Card from './tools/Card';
import homeStyles from '../styles/home.module.css';
import styles from '../styles/myBookings.module.css';
import bookingService from '../services/bookingService';
import {Context} from '../contexts/UserContext';
import {IoChevronBack} from 'react-icons/io5';
import { FaSpinner, FaRegSadCry } from "react-icons/fa";
import {Link} from 'react-router-dom';

function MyBookings(){
    const [bookings, setBookings] =useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [contentLoaded, setContentLoaded] = useState(false);
    const {authUser} = useContext(Context);

    const filterImages = (image) => {
        return image.image?.name?.includes('Primary');
    }

    const onCancelclicked = (id) => {
        bookingService
        .deleteById(id, authUser?.jwt)
        .then(response => {
            console.log(response);
            setBookings((prevState) => {
                const update = [...prevState];
                return update.filter(elem => elem.id !== id);
            })
        })
        .catch(error => console.log(error));
    }

    const bookingsMapper = (booking) => {
        const image = booking.product.images?.length !== 0 && booking.product.images?.find(filterImages);
        const imageUrl = image ? image.image.imgUrl : booking.product.category?.imgUrl
        return(
        <Card
            key={`booking-${booking.id}`}
            img={imageUrl}
            id={booking.id}
            category={booking.product.category?.title}
            location={`${booking.product.city?.state}, ${booking.product.city?.name}, ${booking.product.city?.country}`}
            title={booking.product.name}
            description={`Fecha de entrega: ${booking.initialDate} - Hora de llegada: ${booking.hour} \n - Fecha de devolución: ${booking.finalDate}`}
            onParentActionclicked ={onCancelclicked}
            firstButtonLabel={"Ver más"}
            actionButtonLabel={"Cancelar"}
            customCard={styles.card}
            customButtonStyle={styles.showMore}
            actionButton={styles.actionButton}
            buttonContainer={styles.buttonContainer}
        />)};


    useEffect(() => {
        if(authUser?.id){
            const today = new Date();
            const abortController = new AbortController();
            bookingService
            .getBookingsByUserId(authUser.id, abortController.signal)
            .then(response => {
                let contentArray = [];
                if(response.data !== null){
                    contentArray = response.data.filter(booking => moment(booking.finalDate).isAfter(today));
                    contentArray = contentArray.sort((a, b) => moment(a.initialDate).diff(moment(b.initialDate)));
                    setBookings(contentArray);
                }
                setisLoading(false);
                setContentLoaded(true);
            })
            .catch(error => {console.log(error)
                            setisLoading(false);})

            return () => abortController.abort()
        }
    }, [authUser]);

    return(
        <>
        {isLoading && 
            <div className={styles.myBookingsLoader}>
                <FaSpinner className={styles.loadSpinner}/>
            </div>}
        <div className={`${homeStyles.container} ${styles.myBookingsContainer}`}>
            <div className={styles.myBookingsHeader}>
                <div><h4>Mis reservas</h4></div>
                <Link to={-1}><IoChevronBack className={styles.backIcon}/></Link>
            </div>
            {contentLoaded && (bookings.length !== 0 ? bookings.map(bookingsMapper) 
            : <div className={styles.noBookings}>
                <FaRegSadCry className={styles.noBookingsIcon}/> 
                <div>Aún no has efectuado ninguna reserva</div> 
                <Link to={'/'} className={styles.homeButton}>Volver a Home</Link>
              </div>)}
        </div>
        </>
        
    )
}

export default MyBookings;