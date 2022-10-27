import {React, useState} from "react";
import styles from '../styles/login.module.css'
import { FaEyeSlash, FaEye } from "react-icons/fa";
import {Link} from 'react-router-dom'

function Login(){
    const [showPass, setShowPass] = useState(false);

    const onShowPassClicked = () => {
        setShowPass(!showPass);
    }

    return(
        <div className={styles.loginContainer}>
            <h2 className={styles.loginMobile}>Iniciar sesión</h2>
            <form action="">
                <label className={styles.loginMobile} htmlFor="email">Correo electrónico</label>
                <input className={styles.loginMobile} type="email" id="email" name="email"/>
                <label className={styles.loginMobile} htmlFor="password">Contraseña</label>
                <div>
                <input type={showPass ? 'text' : 'password'} id="password" className={styles.loginMobile} name="password"/>
                {showPass? <FaEyeSlash className={styles.icon} onClick={onShowPassClicked} /> : <FaEye className={styles.icon} onClick={onShowPassClicked}/>}
                </div>
                <button type="button" className={styles.loginMobile}>Ingresar</button>
                <span className={styles.loginMobile}>¿Aún no tenes cuenta? <Link to={"/signup"}>Registrate</Link> </span>
            </form>
        </div>
    )
}

export default Login;