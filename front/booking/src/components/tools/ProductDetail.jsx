import React from "react";
import styles from '../../styles/product.module.css'
import BookingChart from "./BookingChart";
import PhotoGallery from "./PhotoGallery";
import {MdLocationOn } from 'react-icons/md'
import { FaWheelchair, FaBluetoothB, FaEnvira, FaSnowflake, FaSuitcaseRolling, FaSuitcase, FaTachometerAlt, FaTrailer, FaTruckMonster, FaAccessibleIcon} from 'react-icons/fa'

const icons = [FaWheelchair, FaBluetoothB, FaEnvira, FaSnowflake, FaSuitcaseRolling, FaSuitcase, FaTachometerAlt, FaTrailer, FaTruckMonster];

function ProductDetail({product}){

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
                <div>
                    <MdLocationOn className={styles.locationIcon}/>
                    <div>{`${product.location?.state}, ${product.location?.name}, ${product.location?.country}`}</div> 
                </div>
            </div>
            <PhotoGallery/>
            <div className={styles.productDescription}>
                <h2 className={styles.title}>{`Pistea por ${product.location?.state}`}</h2>
                <p>{product.description}
                    </p>
            </div>
            <div className={styles.features}>
                <h2 className={styles.title}>¿Qué ofrece este vehículo?</h2>
                <hr className={styles.separator}/>
                <ul>
                    {product.features?.map(featuresMapper)}
                </ul>
            </div>
            <BookingChart ></BookingChart>
        </>
    )
}

export default ProductDetail;