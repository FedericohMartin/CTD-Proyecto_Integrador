import React, { useEffect, useState } from "react";
import homeStyles from '../styles/home.module.css'
import styles from '../styles/product.module.css'
import productService from "../services/productService";
import {IoChevronBack} from 'react-icons/io5'
import {Link, useParams} from 'react-router-dom'


function Product({children}){
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
            })})
        .catch(error => console.log(error));
    }, [idProducto])

    return(
        <div className={`${homeStyles.container} ${styles.productContainer}`}>
            <div className={styles.productHeader}>
                <div>
                    <div>{product.category?.title}</div>
                    <div>{product.title}</div>
                </div>
                <Link to={"/"}><IoChevronBack className={styles.backIcon}/></Link>
            </div>
            {children(product)}
            <div className={styles.policy}>
                <h2 className={styles.title}>Qué tenés que saber</h2>
                <hr className={styles.separator}/>
                <div>
                    <div>
                        <h3>Normas</h3>
                        <ul>
                            <li key={`policy-10`}>Hola</li>
                            <li key={`policy-11`}>Hola</li>
                            <li key={`policy-12`}>Hola</li>
                        </ul>
                    </div>
                    <div>
                        <h3>Normas</h3>
                        <ul>
                            <li key={`policy-13`}>Hola</li>
                            <li key={`policy-14`}>Hola</li>
                            <li key={`policy-15`}>Hola</li>
                        </ul>
                    </div>
                    <div>
                        <h3>Normas</h3>
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