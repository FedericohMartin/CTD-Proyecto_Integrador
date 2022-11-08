import React from "react";
import homeStyles from '../styles/home.module.css'
import styles from '../styles/product.module.css'
import showIcon from '../img/showPassIcon.png'
import BookingChart from "./tools/BookingChart";
import {IoChevronBack} from 'react-icons/io5'
import {MdLocationOn ,MdAddTask } from 'react-icons/md'
import {Link} from 'react-router-dom'


function Product(){

    return(
        <div className={`${homeStyles.container} ${styles.container}`}>
            <div className={styles.header}>
                <div>
                    <div>CATEGORY</div>
                    <div>Product Title</div>
                </div>
                <Link to={"/"}><IoChevronBack className={styles.backIcon}/></Link>
            </div>
            <div className={styles.location}>
                <div>
                    <MdLocationOn className={styles.locationIcon}/>
                    <div>Buenos Aires, Ciudad Autónoma de Buenos Aires, Argentina <br />A 940 m del centro</div> 
                </div>
                <div></div>
            </div>
            <div className={styles.description}>
                <h2 className={styles.title}>Alójate en el corazón de Buenos Aires</h2>
                <p>Está situado a solo unas calles de la avenida Alvear, de la avenida Quintana, del parque San Martín y del distrito de Recoleta. En las inmediaciones también hay varios lugares de interés, como la calle Florida, el centro comercial Galerías Pacífico, la zona de Puerto Madero, la plaza de Mayo y el palacio Municipal.
                    <br />
                    Nuestros clientes dicen que esta parte de Buenos Aires es su favorita, según los comentarios independientes.
                    El Hotel es un hotel sofisticado de 4 estrellas que goza de una ubicación tranquila, a poca distancia de prestigiosas galerías de arte, teatros, museos y zonas comerciales. Además, hay WiFi gratuita.
                    El establecimiento sirve un desayuno variado de 07:00 a 10:30.
                    </p>
            </div>
            <div className={styles.features}>
                <h2 className={styles.title}>¿Qué ofrece este lugar?</h2>
                <hr className={styles.separator}/>
                <ul>
                    <li>
                        <img src={showIcon} className={styles.featureIcon} alt="" />
                        <div>Hola</div>
                    </li>
                    <li>
                        <MdAddTask className={styles.featureIcon}/>
                        <div>Hola</div>
                    </li>
                    <li>
                        <MdAddTask className={styles.featureIcon}/>
                        <div>Hola</div>
                    </li>
                    <li>
                        <MdAddTask className={styles.featureIcon}/>
                        <div>Hola</div>
                    </li>
                    <li>
                        <MdAddTask className={styles.featureIcon}/>
                        <div>Hola</div>
                    </li>
                    <li>
                        <MdAddTask className={styles.featureIcon}/>
                        <div>Hola</div>
                    </li>
                    <li>
                        <MdAddTask className={styles.featureIcon}/>
                        <div>Hola</div>
                    </li>
                    <li>
                        <MdAddTask className={styles.featureIcon}/>
                        <div>Hola</div>
                    </li>
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
                            <li>Hola</li>
                            <li>Hola</li>
                            <li>Hola</li>
                        </ul>
                    </div>
                    <div>
                        <h3>Normas de la casa</h3>
                        <ul>
                            <li>Hola</li>
                            <li>Hola</li>
                            <li>Hola</li>
                        </ul>
                    </div>
                    <div>
                        <h3>Normas de la casa</h3>
                        <ul>
                            <li>Hola</li>
                            <li>Hola</li>
                            <li>Hola</li>
                        </ul>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Product;