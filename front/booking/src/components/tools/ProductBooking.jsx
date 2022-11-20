import React from "react";
import styles from '../../styles/productBooking.module.css'
import {MdLocationOn } from 'react-icons/md'

function ProductBooking({product}){

    return(
        <>
            <div className={styles.bookingContainer}>
                <div className={styles.bookFormContainer}>
                    <div className={styles.dataContainer}>
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
                        <button>Confirmar reserva</button>
                    </div>
                    
                    
                </div>
            </div>
        </>
    )
}

export default ProductBooking;