import React, { useEffect, useState } from "react";
import homeStyles from '../styles/home.module.css'
import styles from '../styles/product.module.css'
import productService from "../services/productService";
import bookingService from "../services/bookingService";
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
    const [isCalendarLoaded, setIsCalendarLoaded] =useState(false);
    const [bookedDates, setBookedDates] = useState([]);
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
        if(idProducto) {
            const abortController = new AbortController();
            productService
            .getById(idProducto, abortController.signal)
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

            bookingService
            .getBookingsByProdId(idProducto, abortController.signal)
            .then(response => {
                const datesArray = response.data?.map(item => {
                    const initialDate = new Date(`${item.initialDate} EDT`);
                    return {
                        start: initialDate.setDate(initialDate.getDate() - 1),
                        end: new Date(`${item.finalDate} EDT`)
                    }
                })
                setBookedDates(datesArray);
                setIsCalendarLoaded(true);
            })
            .catch(error => console.log(error))

            return () => abortController.abort();
        }
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
            {children(product, isLoaded, onSubmitclicked, bookedDates, isCalendarLoaded)}
            <div className={styles.policy}>
                <h2 className={styles.title}>Qué tenés que saber</h2>
                <hr className={styles.separator}/>
                {isLoaded
                ?<div>
                    <div>
                        <h3>Cobertura Parcial de Daños por Colisión</h3>
                        <ul>
                            <li key={`policy-10`}>La exención de daños por colisión es un servicio opcional que, si se acepta, reduce su responsabilidad financiera por daños o robo del vehículo, sus piezas y accesorios, siempre que el vehículo se utilice de acuerdo con los términos y condiciones del contrato de alquiler. El seguro incluye la Protección contra Robo.</li>
                            <li key={`policy-11`}>Si el seguro es rechazado, usted será responsable hasta el valor total de reposición del vehículo, incluyendo cualquier gasto de remolque, tasas de incautación de almacenamiento, una tasa administrativa, honorarios legales y un cargo razonable por la pérdida de uso.</li>
                            <li key={`policy-12`}></li>
                        </ul>
                    </div>
                    <div>
                        <h3>Combustible</h3>
                        <ul>
                            <li key={`policy-13`}>Las tarifas de no incluyen el combustible.</li>
                            <li key={`policy-14`}>Todos nuestros vehículos se entregan con el depósito de combustible lleno. En caso de no devolver el vehículo en las mismas condiciones se aplicará unn cargo por servicio de repostaje además del cargo por el combustible repostado</li>
                            <li key={`policy-15`}></li>
                        </ul>
                    </div>
                    <div>
                        <h3>Politica de llegada con Retraso</h3>
                        <ul>
                            <li key={`policy-15`}>Si realiza una reserva en la que se especifica un lugar de recogida y no llega al lugar de recogida especificado para el alquiler en las dos horas siguientes a la hora de recogida especificada (o si el lugar cierra antes, a la hora de cierre del lugar), la reserva caducará.</li>
                            <li key={`policy-16`}></li>
                            <li key={`policy-17`}></li>
                        </ul>
                    </div>
                    <div>
                        <h3>Conductores autorizados y adicionales</h3>
                        <ul>
                            <li key={`policy-15`}>La persona nombrada en la reserva debe ser el conductor principal, presente en el momento del alquiler y pagador de los gastos de alquiler.</li>
                            <li key={`policy-16`}>Es posible contar con operadores adicionales con una tarifa de 3,00 USD por día con un máximo de 30,00 USD por alquiler y por conductor adicional.</li>
                            <li key={`policy-17`}></li>
                        </ul>
                    </div>
                </div>
                : <div>{loaders.map(loaderMapper)}</div>}
            </div>
        </div>
    )
}

export default Product;