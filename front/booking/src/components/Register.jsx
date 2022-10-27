import {React, useState} from "react";
import styles from '../styles/register.module.css'
import { FaEyeSlash, FaEye } from "react-icons/fa";
import {Link} from 'react-router-dom'

function Register(){
    const [showPass, setShowPass] = useState(false);

    const onShowPassClicked = () => {
        setShowPass(!showPass);
    }

    return(
        <div className={styles.registerContainer}>
            <h2 className={styles.registerMobile}>Crear cuenta</h2>
            <form action="">
                <div className={`${styles.nameContainer} ${styles.registerMobile}`}>                  
                    <div className={styles.registerMobile}>
                        <label className={styles.registerMobile} htmlFor="name">Nombre</label>
                        <input className={styles.registerMobile} type="text" id="name" name="name"/>
                    </div>
                    <div className={styles.registerMobile}>
                        <label className={styles.registerMobile} htmlFor="lastName">Apellido</label>
                        <input className={styles.registerMobile} type="text" id="lastName" name="lastName"/>
                    </div>
                </div>
                <label className={styles.registerMobile} htmlFor="email">Correo electrónico</label>
                <input className={styles.registerMobile} type="email" id="email" name="email"/>
                <label className={styles.registerMobile} htmlFor="password">Contraseña</label>
                <div>
                <input type={showPass ? 'text' : 'password'} id="password" className={styles.registerMobile} name="password"/>
                {showPass? <FaEyeSlash className={styles.icon} onClick={onShowPassClicked} /> : <FaEye className={styles.icon} onClick={onShowPassClicked}/>}
                </div>
                <label className={styles.registerMobile} htmlFor="passwordConfirm">Confirmar contraseña</label>
                <div>
                <input type={showPass ? 'text' : 'password'} id="passwordConfirm" className={styles.registerMobile} name="passwordConfirm"/>
                </div>
                <button type="button" className={styles.registerMobile}>Crear cuenta</button>
                <span className={styles.registerMobile}>¿Ya tienes una cuenta? <Link to={"/login"}>Iniciar sesión</Link></span>
            </form>
        </div>
    )
}

export default Register;