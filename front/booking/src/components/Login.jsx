import {React, useState, useEffect, useContext} from "react";
import {Context} from '../contexts/UserContext'
import styles from '../styles/login.module.css'
import { FaEyeSlash, FaEye, FaSpinner } from "react-icons/fa";
import { IoAlertCircleSharp } from "react-icons/io5";
import {Link, useNavigate, useLocation} from 'react-router-dom'

function Login(props){
    const [showPass, setShowPass] = useState(false);
    const [login, setLogin] = useState("");
    const [isLoading, setisLoading] = useState(false);
    const [valid, setvalid] =useState({
        email: true,
        password: true,
    });
    const [formData, setFormData] = useState({
        email: "",
        password: "",
     });
     const { onLoginClicked } = useContext(Context);
     const { state } = useLocation();

     const navigate = useNavigate();

    const onShowPassClicked = () => {
        setShowPass(!showPass);
    }

    const onFormFieldChange = (event) => {
        const target = event.target;
  
        const newUserValue = target.value;
  
        const nameOfField = target.name;
  
        setFormData((prevState) => {
           const updatedFormData = {
              ...prevState,
           };
              updatedFormData[nameOfField] = newUserValue;
  
           return updatedFormData;
        });
     };

     const onSubmitClicked = async (e) => {
        e.preventDefault();
        setisLoading(true);
        if(formData.email.length === 0 || formData.password.length === 0){
            setvalid({
                email: false,
                password: false,
            });
            setisLoading(false);
        } else if(valid.email === true && valid.password === true){
            const result = await onLoginClicked(e, formData);
            setLogin(result)
            setisLoading(false);
            result  && (state === null ? navigate("/") : navigate(`${state.pathname}`));
        }
     }

     useEffect(() => {
        if (formData.email.length !== 0) {
            let positionAt = formData.email.lastIndexOf('@');
            let positionDot = formData.email.lastIndexOf('.');
            let validations = !(positionAt < positionDot && positionAt > 0 && formData.email.indexOf('@@') === -1 && positionDot > 2 && (formData.email.length - positionDot) > 2);
            let result = validations ? false : true;
            setvalid((prevState) => {
                prevState.email = result;
                return prevState;
            });
        }

        if(formData.password.length !== 0){
            let result = formData.password.length > 5 ? true : false

            setvalid((prevState) => {
                prevState.password = result;
                return prevState;
            });
        }
        

     }, [formData])

    return(
        <>
            {isLoading && 
                <div className={styles.loginFormLoader}>
                    <FaSpinner className={styles.loadSpinner}/>
                </div>}
            <div className={styles.loginContainer}>
                {state !==null && <div className={styles.alertContainer}>
                    <IoAlertCircleSharp className={styles.alertIcon}/>
                    <div className={styles.alertMessage}>Para realizar una reserva necesitas estar logueado</div>
                </div>}
                <h2 className={styles.loginMobile}>Iniciar sesión</h2>
                <form action="">
                    <label className={styles.loginMobile} htmlFor="email">Correo electrónico</label>
                    <input className={`${styles.loginMobile} ${!valid.email && styles.borderWarning}`} type="email" id="email" name="email" value={formData.email} onChange={onFormFieldChange}/>
                    {!valid.email && formData.email.length !== 0 && <span className={styles.warning}>Email inválido, debe incluir @ y dominio</span>}
                    {!valid.email && formData.email.length === 0 && <span className={styles.warning}>Este dato es requerido</span>}
                    <label className={styles.loginMobile} htmlFor="password">Contraseña</label>
                    <div>
                        <input type={showPass ? 'text' : 'password'} id="password" className={`${styles.loginMobile} ${!valid.password && styles.borderWarning}`} name="password" value={formData.password} onChange={onFormFieldChange}/>
                        {showPass? <FaEyeSlash className={styles.icon} onClick={onShowPassClicked} /> : <FaEye className={styles.icon} onClick={onShowPassClicked}/>}
                    </div>
                    {!valid.password && formData.password.length !== 0 && <span className={styles.warning}>Contraseña inválida, debe tener más de 5 caracteres</span>}
                    {!valid.password && formData.password.length === 0 && <span className={styles.warning}>Este dato es requerido</span>}
                    <button type="submit" className={styles.loginMobile} onClick={onSubmitClicked}>Ingresar</button>
                    <span className={styles.loginMobile}>¿Aún no tenes cuenta? <Link to={"/signup"}>Registrate</Link> </span>
                    {!login && login !== "" && <span className={`${styles.warning} ${styles.loginFail}`}>Credenciales inválidas, por favor vuelva a intentarlo</span>}
                </form>
            </div>
        </>
    )
}

export default Login;