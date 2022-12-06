import React from "react";
import styles from '../../styles/product.module.css'
import BookingChart from "./BookingChart";
import PhotoGallery from "./PhotoGallery";
import {MdLocationOn } from 'react-icons/md'
import * as Icons from "react-icons/fa";

const DynamicFaIcon = ({ name, className }) => {
  const IconComponent = Icons[name];

  if (!IconComponent) { 
    return <Icons.FaBeer />;
  }

  return <IconComponent className={className} />;
};

function ProductDetail({product, isLoaded, bookedDates, isCalendarLoaded}){

    const featuresMapper = (feature) => {
        return (
            <li key={`feature-${feature?.feature?.id}`}>
                <DynamicFaIcon name={feature?.feature?.icon} className={styles.featureIcon}/>
                <div>{feature?.feature?.name}</div>
            </li>
        );
    }

    return (
        <>
            <div className={styles.productLocation}>
                {isLoaded && isCalendarLoaded
                ? <div>
                    <MdLocationOn className={styles.locationIcon}/>
                    <div>{`${product.location?.state}, ${product.location?.name}, ${product.location?.country}`}</div> 
                  </div>
                : <div className={styles.locationLoader}></div>}
            </div>
            <PhotoGallery product={product} isLoaded={isLoaded} isCalendarLoaded={isCalendarLoaded}/>
            {isLoaded && isCalendarLoaded
            ?<div className={styles.productDescription}>
                <h2 className={styles.title}>{`Pistea con tu ${product.title}`}</h2>
                <p>{product.description}</p>
            </div>
            : <div className={styles.descriptionLoader}></div>}
            <div className={styles.features}>
                <h2 className={styles.title}>¿Qué ofrece este vehículo?</h2>
                <hr className={styles.separator}/>
                {isLoaded && isCalendarLoaded
                ?<ul>
                    {product.features?.map(featuresMapper)}
                 </ul>
                : <div className={styles.featuresLoader}></div>}
            </div>
            <BookingChart product={product} isLoaded={isLoaded} bookedDates={bookedDates} isCalendarLoaded={isCalendarLoaded}></BookingChart>
        </>
    )
}

export default ProductDetail;