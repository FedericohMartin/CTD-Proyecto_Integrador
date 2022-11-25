import React, { useEffect, useState } from "react";
import homeStyles from '../styles/home.module.css'
import styles from '../styles/product.module.css'
import productService from "../services/productService";
import {IoChevronBack} from 'react-icons/io5'
import {Link, useParams} from 'react-router-dom'


function Product({children}){
    const [product, setProduct] = useState(
        {
            id: "",
            category: "",
            title: "",
            location: {},
            description: "",
            features: [],
            images: [],   
        }
    )
    const [isLoaded, setIsLoaded] =useState(false);
    const loaders = Array.from({length: 3}, (_, i) => {return i})
    const { idProducto } = useParams();

    const loaderMapper = (loader) => {
        return(
            <div key={loader} className={styles.policiesLoader}></div>
        )
    }

    const onSubmitclicked = () =>{
        setIsLoaded(!isLoaded);
    }

    useEffect(() => {
        productService
        .getById(idProducto)
        .then(response => {
            setProduct((prevState) => {
                const newState = {...prevState};
                newState.id = response.data.id
                newState.category = response.data.category;
                newState.title = response.data.name;
                newState.location = response.data.city;
                newState.description = response.data.description;
                newState.features = response.data.features;
                newState.images = response.data.images;

                return newState;
            })
            setIsLoaded(true);
        })       
        .catch(error => console.log(error));
    }, [idProducto])

    return(
        <div className={`${homeStyles.container} ${styles.productContainer}`}>
            <div className={styles.productHeader}>
                {isLoaded 
                ? <div>
                    <div>{product.category?.title}</div>
                    <div>{product.title}</div>
                  </div> 
                : <div className={styles.categoryLoader}></div>}
                <Link to={-1}><IoChevronBack className={styles.backIcon}/></Link>
            </div>
            {children(product, isLoaded, onSubmitclicked)}
            <div className={styles.policy}>
                <h2 className={styles.title}>Qué tenés que saber</h2>
                <hr className={styles.separator}/>
                {isLoaded
                ?<div>
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
                : <div>{loaders.map(loaderMapper)}</div>}
            </div>
        </div>
    )
}

export default Product;