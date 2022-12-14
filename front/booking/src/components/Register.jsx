import {React, useState, useContext, useEffect} from "react";
import {Context} from '../contexts/UserContext'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import styles from '../styles/register.module.css'
import { FaEyeSlash, FaEye, FaSpinner } from "react-icons/fa";

function Register(){
    const [showPass, setShowPass] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    const [valid, setvalid] =useState({
        name: true,
        surname: true,
        email: true,
        password: true,
        passwordConfirm: true,
    });
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        passwordConfirm: "",
        userCity: 2,
        userName: "",
        role: {
            id: 2,
            name: "user"
        }
     });
     const { onRegisterClicked } = useContext(Context);
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
                updatedFormData.userName = updatedFormData.name + updatedFormData.surname;
    
            return updatedFormData;
            });
        
     };

     const onSubmitClicked = async (e) => {
        e.preventDefault();
        setisLoading(true);
        if(formData.email.length === 0 || formData.password.length === 0 || formData.name.length === 0 || formData.surname.length === 0){
            setvalid({
                name: formData.name.length === 0 ? false : true,
                surname: formData.surname.length === 0 ? false : true,
                email: formData.email.length === 0 ? false : true,
                password: formData.password.length === 0 ? false : true,
            });
            setisLoading(false);
        } else if(valid.email === true && valid.password === true && valid.name === true && valid.surname === true){
            const result = await onRegisterClicked(e, formData);
            result && setisLoading(false);
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
                const update = {...prevState};
                update.password = result;
                return update;
            });
        }

        if(formData.passwordConfirm.length !== 0){
            let confirm = formData.password === formData.passwordConfirm ? true : false;

            setvalid((prevState) => {
                const update = {...prevState};
                update.passwordConfirm = confirm;
                return update;
            });
        }

        if(formData.name){
            setvalid((prevState) => {
                return {...prevState, name: true};
            })
        }

        if(formData.surname){
            setvalid((prevState) => {
                return {...prevState, surname: true};
            })
        }
        

     }, [formData])

    return(
        <>
            {isLoading && 
                <div className={styles.registerFormLoader}>
                    <FaSpinner className={styles.loadSpinner}/>
                </div>}
            <div className={styles.registerContainer}>
                <h2 className={styles.registerMobile}>Crear cuenta</h2>
                <form action="">
                    <div className={`${styles.nameContainer} ${styles.registerMobile}`}>                  
                        <div className={styles.registerMobile}>
                            <label className={styles.registerMobile} htmlFor="name">Nombre</label>
                            <input className={`${styles.registerMobile} ${!valid.name && styles.borderWarning}`} type="text" id="name" name="name" onChange={onFormFieldChange}/>
                            {!valid.name && formData.name.length === 0 && <span className={styles.warning}>Este dato es requerido</span>}
                        </div>
                        <div className={styles.registerMobile}>
                            <label className={styles.registerMobile} htmlFor="surname">Apellido</label>
                            <input className={`${styles.registerMobile} ${!valid.surname && styles.borderWarning}`} type="text" id="surname" name="surname" onChange={onFormFieldChange}/>
                            {!valid.surname && formData.surname.length === 0 && <span className={styles.warning}>Este dato es requerido</span>}
                        </div>
                    </div>
                    <label className={styles.registerMobile} htmlFor="email">Correo electrónico</label>
                    <input className={`${styles.registerMobile} ${!valid.email && styles.borderWarning}`} type="email" id="email" name="email" onChange={onFormFieldChange}/>
                    {!valid.email && formData.email.length !== 0 && <span className={styles.warning}>Email inválido, debe incluir @ y dominio</span>}
                    {!valid.email && formData.email.length === 0 && <span className={styles.warning}>Este dato es requerido</span>}
                    <label className={styles.registerMobile} htmlFor="password">Contraseña</label>
                    <div>
                    <input type={showPass ? 'text' : 'password'} id="password" className={`${styles.registerMobile} ${!valid.password && styles.borderWarning}`} name="password" onChange={onFormFieldChange}/>
                    {showPass? <FaEyeSlash className={styles.icon} onClick={onShowPassClicked} /> : <FaEye className={styles.icon} onClick={onShowPassClicked}/>}
                    </div>
                    {!valid.password && formData.password.length !== 0 && <span className={styles.warning}>Contraseña inválida, debe tener más de 5 caracteres</span>}
                    {!valid.password && formData.password.length === 0 && <span className={styles.warning}>Este dato es requerido</span>}
                    <label className={styles.registerMobile} htmlFor="passwordConfirm">Confirmar contraseña</label>
                    <div>
                    <input type={showPass ? 'text' : 'password'} id="passwordConfirm" className={`${styles.registerMobile} ${!valid.passwordConfirm && styles.borderWarning}`} name="passwordConfirm" onChange={onFormFieldChange}/>
                    </div>
                    {!valid.passwordConfirm && formData.passwordConfirm.length !== 0 && <span className={styles.warning}>Las contraseñas no coinciden</span>}
                    {!valid.passwordConfirm && formData.passwordConfirm.length === 0 && <span className={styles.warning}>Este dato es requerido</span>}
                    <button type="button" className={styles.registerMobile} onClick={onSubmitClicked}>Crear cuenta</button>
                    <span className={styles.registerMobile}>¿Ya tienes una cuenta? <Link to={"/login"}>Iniciar sesión</Link></span>
                </form>
            </div>
        </>
    )
}

export default Register;