import React, { useEffect, useState } from "react";
import homeStyles from '../styles/home.module.css'
import styles from '../styles/product.module.css'
import BookingChart from "./tools/BookingChart";
import productService from "../services/productService";
import {IoChevronBack} from 'react-icons/io5'
import {MdLocationOn } from 'react-icons/md'
import { FaWheelchair, FaBluetoothB, FaEnvira, FaSnowflake, FaSuitcaseRolling, FaSuitcase, FaTachometerAlt, FaTrailer, FaTruckMonster, FaAccessibleIcon} from 'react-icons/fa'
import {Link, useParams} from 'react-router-dom'

const icons = [FaWheelchair, FaBluetoothB, FaEnvira, FaSnowflake, FaSuitcaseRolling, FaSuitcase, FaTachometerAlt, FaTrailer, FaTruckMonster];

function Product(){
    const [product, setProduct] = useState(
        {
            category: "",
            title: "",
            location: {},
            description: "",
            features: [],   
        }
    )

    const { idProducto } = useParams();

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


    useEffect(() => {
        productService
        .getById(idProducto)
        .then(response => {
            setProduct((prevState) => {
                const newState = {...prevState};
                newState.category = response.data.category;
                newState.title = response.data.name;
                newState.location = response.data.city;
                newState.description = response.data.description;
                newState.features = response.data.features;

                return newState;
            })});
    }, [idProducto])

    return(
        <div className={`${homeStyles.container} ${styles.container}`}>
            <div className={styles.header}>
                <div>
                    <div>{product.category?.title || `CATEGORY`}</div>
                    <div>{product.title}</div>
                </div>
                <Link to={"/"}><IoChevronBack className={styles.backIcon}/></Link>
            </div>
            <div className={styles.location}>
                <div>
                    <MdLocationOn className={styles.locationIcon}/>
                    <div>{`${product.location?.state}, ${product.location?.name}, ${product.location?.country}`}</div> 
                </div>
                <div></div>
            </div>
            <div className={styles.description}>
                <h2 className={styles.title}>{`Pasea por ${product.location?.state}`}</h2>
                <p>{product.description}
                    </p>
            </div>
            <div className={styles.features}>
                <h2 className={styles.title}>¿Qué ofrece este lugar?</h2>
                <hr className={styles.separator}/>
                <ul>
                    {product.features?.map(featuresMapper)}
                </ul>
            </div>
            <BookingChart ></BookingChart>
            <div className={styles.policy}>
                <h2 className={styles.title}>Qué tenés que saber</h2>
                <hr className={styles.separator}/>
                <div>
                    <div>
                        <h3>Normas de la casa</h3>
                        <ul>
                            <li key={`policy-10`}>Hola</li>
                            <li key={`policy-11`}>Hola</li>
                            <li key={`policy-12`}>Hola</li>
                        </ul>
                    </div>
                    <div>
                        <h3>Normas de la casa</h3>
                        <ul>
                            <li key={`policy-13`}>Hola</li>
                            <li key={`policy-14`}>Hola</li>
                            <li key={`policy-15`}>Hola</li>
                        </ul>
                    </div>
                    <div>
                        <h3>Normas de la casa</h3>
                        <ul>
                            <li key={`policy-15`}>Hola</li>
                            <li key={`policy-16`}>Hola</li>
                            <li key={`policy-17`}>Hola</li>
                        </ul>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Product;