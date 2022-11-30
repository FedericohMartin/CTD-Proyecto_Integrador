import React from "react";
import styles from '../../styles/product.module.css'
import BookingChart from "./BookingChart";
import PhotoGallery from "./PhotoGallery";
import {MdLocationOn } from 'react-icons/md'
import { FaWheelchair, FaBluetoothB, FaEnvira, FaSnowflake, FaSuitcaseRolling, FaSuitcase, FaTachometerAlt, FaTrailer, FaTruckMonster, FaAccessibleIcon} from 'react-icons/fa'

const icons = [FaWheelchair, FaBluetoothB, FaEnvira, FaSnowflake, FaSuitcaseRolling, FaSuitcase, FaTachometerAlt, FaTrailer, FaTruckMonster];

function ProductDetail({product, isLoaded, bookedDates}){

    const featuresMapper = (feature) => {
        const findIcon = icons.findIndex((icon) => {
            return icon.name === feature.feature.icon;
        })
        const iconTagName = findIcon !== -1 ? icons[findIcon] : FaAccessibleIcon

        const icon = React.createElement(iconTagName, { className: styles.featureIcon});
        const featureName = React.createElement('div', {}, feature.feature.name);
        const container = React.createElement('li', { key: `feature-${feature.feature.id}`}, [icon, featureName]);

        return container;
    }

    return (
        <>
            <div className={styles.productLocation}>
                {isLoaded
                ? <div>
                    <MdLocationOn className={styles.locationIcon}/>
                    <div>{`${product.location?.state}, ${product.location?.name}, ${product.location?.country}`}</div> 
                  </div>
                : <div className={styles.locationLoader}></div>}
            </div>
            <PhotoGallery product={product} isLoaded={isLoaded}/>
            {isLoaded
            ?<div className={styles.productDescription}>
                <h2 className={styles.title}>{`Pistea con tu ${product.title}`}</h2>
                <p>{product.description}</p>
            </div>
            : <div className={styles.descriptionLoader}></div>}
            <div className={styles.features}>
                <h2 className={styles.title}>¿Qué ofrece este vehículo?</h2>
                <hr className={styles.separator}/>
                {isLoaded
                ?<ul>
                    {product.features?.map(featuresMapper)}
                 </ul>
                : <div className={styles.featuresLoader}></div>}
            </div>
            <BookingChart product={product} isLoaded={isLoaded} bookedDates={bookedDates}></BookingChart>
        </>
    )
}

export default ProductDetail;