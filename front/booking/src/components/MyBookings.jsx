import React, { useState, useEffect, useContext } from "react";
import moment from 'moment';
import Card from './tools/Card';
import homeStyles from '../styles/home.module.css';
import styles from '../styles/myBookings.module.css';
import bookingService from '../services/bookingService';
import {Context} from '../contexts/UserContext';
import {IoChevronBack} from 'react-icons/io5';
import { FaSpinner } from "react-icons/fa";
import {Link} from 'react-router-dom';

function MyBookings(){
    const [bookings, setBookings] =useState([]);
    const [isLoading, setisLoading] = useState(false);
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
        setisLoading(true);
        if(authUser?.id){
            const today = new Date();
            const abortController = new AbortController();
            bookingService
            .getBookingsByUserId(authUser.id, abortController.signal)
            .then(response => {
                setBookings(response.data.filter(booking => moment(booking.finalDate).isAfter(today)));
                setisLoading(false);
            })
            .catch(error => console.log(error))

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
            {bookings.map(bookingsMapper)}
        </div>
        </>
        
    )
}

export default MyBookings;