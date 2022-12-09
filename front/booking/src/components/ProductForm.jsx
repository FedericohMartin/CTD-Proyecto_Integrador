import React, { useState, useEffect, useContext } from "react";
import {Context} from '../contexts/UserContext'
import homeStyles from '../styles/home.module.css';
import styles from '../styles/productForm.module.css';
import { FaPlusSquare, FaWindowClose, FaSpinner } from "react-icons/fa";
import categoryService from "../services/categoryService";
import citiesService from "../services/citiesService";
import featureService from "../services/featureService";
import productService from "../services/productService";
import {IoChevronBack, IoAlertCircleOutline} from 'react-icons/io5';
import {Link, useNavigate} from 'react-router-dom';

function ProductForm(){
    const [newProductForm, setNewProductForm] = useState({
        name: "",
        description: "",
        stock: 1,
        carryOn: 1,
        suitcase: 1,
        cityId: "",
        categoryId: "",
        policies: [],
        images: [],
        feature_ids: []
    })
    const [valid, setvalid] =useState({
        name: true,
        description: true,
        stock: true,
        address: true,
        carryOn: true,
        suitcase: true,
        cityId: true,
        categoryId: true,
        policies: true,
        images: true,
        feature_ids: true,
    });
    const [categories, setCategories] = useState([]);
    const [cities, setCities] = useState([]);
    const [featureForms, setFeatureForms] = useState([{
        name: "",
        icon: "",
    }]);
    const [featureFormsValid, setFeatureFormsValid] = useState([{
        name: true,
        icon: true,
    }]);
    const [imgForms, setImgForms] = useState([{imgUrl: "", sent: false}]);
    const [imgFormsValid, setImgFormsValid] = useState([{imgUrl: true}]);
    const [policiesForm, setPoliciesForm] = useState({
        damagePolicy: "",
        fuelPolicy: "",
        delayPolicy: "",
        driverPolicy: "",
    })
    const [isLoading, setisLoading] = useState(false);
    const [productAddFailed, setProductAddFailed] = useState(false);
    const navigate = useNavigate();
    const {authUser} = useContext(Context);

    const onFormFieldChange = (e) => {
        const target = e.target;
        const fieldName = target.name;
        const userValue = target.value;

        setNewProductForm((prevState) => {
            if(fieldName === "carryOn" || fieldName === "stock" || fieldName === "suitcase" || fieldName === "cityId" || fieldName === "categoryId"){
                return {...prevState, [fieldName]: parseInt(userValue)};
            }
            return {...prevState, [fieldName]: userValue};
        })
    }

    const onPoliciesFormFieldChange = (e) => {
        const target = e.target;
        const fieldName = target.name;
        const userValue = target.value;

        setPoliciesForm((prevState) => {
            return {...prevState, [fieldName]: userValue};
        })

        let updatedPolicies = [...newProductForm.policies];
        updatedPolicies = Object.values(policiesForm);

        setNewProductForm({...newProductForm, policies: updatedPolicies})
    }

    const onArrayFormFieldChange = (e, index) => {
        const target = e.target;
        const fieldName = target.name;
        const userValue = target.value;

        if(fieldName === "imgUrl"){
            setImgForms((prevState) => {
                const updated = [...prevState];
                updated[index][fieldName] = userValue;
                return updated;
            })
        }else{
            setFeatureForms((prevState) => {
                const updated = [...prevState];
                updated[index][fieldName] = userValue;
                return updated;
            })
        }  
    }

    const categoriesMapper = (category) => {
        return (
            <option value={category.id} key={`category-${category.id}`}>
               {category.title} 
            </option>
        )
    }

    const cityMapper = (cities) => (
        <option key={`city-${cities.id}`} value= {cities.id}>{cities.name} - {cities.state} - {cities.country}   </option>)
    
    const featureFormsMapper = (featureForm, index) => (<div key={`featureForm-${index}`} className={!valid.feature_ids ? styles.borderWarning : undefined}>
                                                            <div>
                                                                <div className={styles.featureName}>
                                                                    <label htmlFor="featureName">Nombre</label>
                                                                    <input className={(!featureFormsValid[index]?.name && featureForm.name?.length === 0) ? styles.borderWarning : undefined} type="text" id="featureName" name="name" value={featureForm.name} onChange={e => {onArrayFormFieldChange(e, index)}} required disabled={featureForm.id}/>
                                                                </div>
                                                                <div className={styles.featureIcon}>
                                                                    <label htmlFor="featureIcon">Ícono</label>
                                                                    <input className={(!featureFormsValid[index]?.icon && featureForm.icon?.length === 0) ? styles.borderWarning : undefined} type="text" id="featureIcon" name="icon" value={featureForm.icon} onChange={e => {onArrayFormFieldChange(e, index)}} required disabled={featureForm.id}/>
                                                                </div>
                                                            </div>
                                                            {featureForm?.id 
                                                            ? <FaWindowClose onClick={() => {onRemoveFeatureClicked(index)}} className={styles.removeIcon}/> 
                                                            :<FaPlusSquare className={styles.addIcon} onClick={() => {onAddFeatureClicked(index)}}/>}
                                                            {(!featureFormsValid[index]?.name || !featureFormsValid[index]?.icon) 
                                                            && (featureForm.name?.length === 0 || featureForm.icon?.length === 0) 
                                                            && <span className={styles.warning}>Ambos campos son requeridos</span>}
                                                            {!valid.feature_ids && newProductForm.feature_ids.length === 0 && <span className={styles.warning}>Debes agregar al menos un atributo</span>}
                                                        </div>)

    const imagesMapper = (image, index) => (<div key={`imgForm-${index}`} className={!valid.images ? styles.borderWarning : undefined}>
                                                <div className={styles.featureName}>
                                                    <input className={(!imgFormsValid[index]?.imgUrl && image.imgUrl?.length === 0) ? styles.borderWarning : undefined} 
                                                    type="url" id="featureName" name="imgUrl" 
                                                    value={image.imgUrl} 
                                                    onChange={e => {onArrayFormFieldChange(e, index)}} 
                                                    placeholder="ingresar https://" required
                                                    disabled={newProductForm.images.includes(image.imgUrl) && image.sent}/>
                                                </div>
                                                {newProductForm.images.includes(imgForms[index].imgUrl) && image.sent
                                                ? <FaWindowClose onClick={() => {onRemoveImageClicked(index)}} className={styles.removeIcon}/>
                                                :<FaPlusSquare className={styles.addIcon} onClick={() => {onAddImageClicked(index)}}/>}
                                                {!imgFormsValid[index]?.imgUrl  
                                                    && image.imgUrl.length === 0 
                                                    && <span className={styles.warning}>Debes agregar la url de tu imagen</span>}
                                                {!valid.images && newProductForm.images.length === 0 && <span className={styles.warning}>Debes agregar al menos una imagen</span>}
                                            </div>)

    const onAddFeatureClicked = async (index) => {
        if(!featureForms[index].name || !featureForms[index].icon){
            setFeatureFormsValid((prevState) => {
                const update = [...prevState]
                update[index].name = false;
                update[index].icon = false;

                return update;

            })
        }else{
            const newItem = { name: "",
            icon: ""}

            const newFeature = await featureService.add(featureForms[index], authUser.jwt);

            if(newFeature.data)
            {
            setFeatureFormsValid((prevState) => {
                const update = [...prevState, {
                    name: true,
                    icon: true,
                }]

                return update;
            })
            setFeatureForms((prevState) => {
                const updated = [...prevState, newItem];
                updated[index].id= newFeature.data.id;
                return updated;
            });
            setNewProductForm((prevState) => {
                const updated = {...prevState, feature_ids: [...prevState.feature_ids, newFeature.data.id]};

                return updated;
            })}
        }
    }

    const onRemoveFeatureClicked = (index) => {
        setFeatureForms((prevState) => {
            const updated = [...prevState];
            updated.splice(index, 1);
            return updated;
        });

        const updatedFeatIds = [...newProductForm.feature_ids];
        updatedFeatIds.splice(updatedFeatIds.findIndex(value => value === featureForms[index].id ),
        1)
        setNewProductForm((prevState) => {
            const updated = {...prevState, feature_ids: updatedFeatIds};

            return updated;
        })
    }

    const onAddImageClicked = (index) => {
        if(!imgForms[index].imgUrl){
            setImgFormsValid((prevState) => {
                const update = [...prevState]
                update[index].imgUrl = false;

                return update;
            })
        }else{
            setNewProductForm((prevState) => {
                const updated = {...prevState, images: [...prevState.images, imgForms[index].imgUrl]};
                
                return updated;
            })
            setImgFormsValid((prevState) => {
                const update = [...prevState, {imgUrl: true}]
                return update;
            })
            setImgForms(prevState =>{
                const updated=[...prevState, {imgUrl:"", sent: false}];
                updated[index].sent= true;
    
                return updated;
            });
        }     
    }

    const onRemoveImageClicked = (index) => {
        setImgForms((prevState) => {
            const updated = [...prevState];
            updated.splice(index, 1);
            return updated;
        });

        const updatedImgs = [...newProductForm.images];
        updatedImgs.splice(updatedImgs.findIndex(value => value === imgForms[index].imgUrl ),
        1)
        setNewProductForm((prevState) => {
            const updated = {...prevState, images: updatedImgs};

            return updated;
        })
    }

    const validateForm = () => {
        let result = true;
        for (const property in newProductForm) {
            if(!newProductForm[property] || newProductForm[property].length === 0){
                setvalid((prevState) => {
                    const update = {...prevState};

                    update[property] = false;
                    return update;
                })
                if(property === "policies"){
                    newProductForm[property].forEach(policy => {
                        if(!policy){
                            setvalid((prevState) => {
                                const update = {...prevState};
            
                                update.policies = false;
                                return update;
                            })
                        }else{
                            setvalid((prevState) => {
                                const update = {...prevState};
            
                                update.policies = true;
                                return update;
                            })
                        }
                    })
                }
                result = false;
            }else if(property === "policies"){
                if(!valid[property]){
                    result = false;
                }
            }    
          }
        return result;
    }

    const onSubmitClicked = async (e) => {
        e.preventDefault();
        const validation = validateForm();

       if(validation) {
            setisLoading(true)
            const addProductPromise = await productService.add(newProductForm, authUser.jwt)

            if(addProductPromise.data){
                navigate('producto-agregado-exitosamente'); 
            }else{
                setProductAddFailed(true);
                setisLoading(false);
            }
        } 
          
    }

    useEffect(() => {
        const abortController = new AbortController();
        categoryService
        .getAll(abortController.signal)
        .then((response) => {
            setCategories(response.data);
        })
        .catch(error =>{

            console.log(error)});
        
        citiesService
        .getAll(abortController.signal)
        .then((response) => {
            setCities(response.data);
        })
        .catch(error => console.log(error))

        return () => abortController.abort();
    }, []);

    useEffect(() => {
        for (const property in newProductForm) {
            if(newProductForm[property] && newProductForm[property].length !== 0){
                setvalid((prevState) => {
                    const update = {...prevState};

                    update[property] = true;
                    return update;
                })
                if(property === "policies"){
                    newProductForm[property].forEach(policy => {
                        if(!policy){
                            setvalid((prevState) => {
                                const update = {...prevState};
            
                                update.policies = false;
                                return update;
                            })
                        } else{
                            setvalid((prevState) => {
                                const update = {...prevState};
            
                                update.policies = true;
                                return update;
                            })
                        }
                    })
                }
            }
          }
    }, [newProductForm])

    return(
        <>
            {isLoading && 
            <div className={styles.prodFormLoader}>
                <FaSpinner className={styles.loadSpinner}/>
            </div>}
            <div className={`${homeStyles.container} ${styles.productFormContainer}`}>
                <div className={styles.productHeader}>
                    <div><h4>Administración de productos</h4></div>
                    <Link to={-1}><IoChevronBack className={styles.backIcon}/></Link>
                </div>
                <h4>Agregar vehículo</h4>
                <form className={styles.productForm}>
                    <div className={styles.mainData}>
                        <div>
                            <div>
                                <label htmlFor="name">Nombre del vehículo</label>
                                <input type="text" id="name" name="name" className={!valid.name ? styles.borderWarning : undefined} onChange={onFormFieldChange} value={newProductForm.name} placeholder="Nombre" required/>
                                {!valid.name && newProductForm.name.length === 0 && <span className={styles.warning}>Este dato es requerido</span>}
                            </div>
                            <div>
                                <label htmlFor="categoryId">Categoría</label>
                                <select className={!valid.categoryId ? styles.borderWarning : undefined} id="categoryId" name="categoryId" onChange={onFormFieldChange} value={newProductForm.categoryId} required>
                                    <option id="title" value="">
                                    Elige una categoría
                                    </option>
                                    {categories.map(categoriesMapper)}
                                </select> 
                                {!valid.categoryId && newProductForm.categoryId.length === 0 && <span className={styles.warning}>Este dato es requerido</span>}
                            </div>
                        </div>
                        <div>
                            <div>
                                <label htmlFor="address">Dirección</label>
                                <input className={!valid.address ? styles.borderWarning : undefined} type="text" id="address" name="address" onChange={onFormFieldChange} placeholder="Dirección" disabled required/>
                                {!valid.address && newProductForm.address?.length === 0 && <span className={styles.warning}>Este dato es requerido</span>}
                            </div>
                            <div>
                                <label htmlFor="cityId">Ciudad</label>
                                <select className={!valid.cityId ? styles.borderWarning : undefined} id="cityId" name="cityId" onChange={onFormFieldChange} value={newProductForm.cityId} required>
                                    <option id="title" value="">
                                    Elige una ciudad
                                    </option>
                                    {cities.map(cityMapper)}
                                </select> 
                                {!valid.cityId && newProductForm.cityId.length === 0 && <span className={styles.warning}>Este dato es requerido</span>}
                            </div>
                        </div>
                        <div className={styles.description}>
                            <div>
                                <label htmlFor="description">Descripción</label>
                                <textarea className={!valid.description ? styles.borderWarning : undefined} rows={6} id="description" name="description" onChange={onFormFieldChange} value={newProductForm.description} placeholder="Escribe aquí" required/>
                                {!valid.description && newProductForm.description.length === 0 && <span className={styles.warning}>Este dato es requerido</span>}
                            </div>
                        </div>
                    </div>
                    <div className={styles.features}>
                        <h5>Agregar Atributos</h5>
                            {featureForms.map(featureFormsMapper)}
                    </div>
                    <div>
                        <h5>Políticas del producto</h5>
                    </div>
                    <div className={styles.policies}>   
                        <div>
                            <div>
                                <h6>Cobertura Parcial de Daños por Colisión</h6>
                                <label htmlFor="damagePolicy">Descripción</label>
                                <textarea className={(!valid.policies && policiesForm.damagePolicy?.length === 0) ? styles.borderWarning : undefined} rows={9} id="damagePolicy" name="damagePolicy" placeholder="Escribe aquí" onChange={onPoliciesFormFieldChange} required/>
                                {(!valid.policies && policiesForm.damagePolicy?.length === 0) && <span className={styles.warning}>Este dato es requerido</span>}
                            </div>
                            <div>
                                <h6>Combustible</h6>
                                <label htmlFor="fuelPolicy">Descripción</label>
                                <textarea className={(!valid.policies && policiesForm.fuelPolicy?.length === 0) ? styles.borderWarning : undefined} rows={9} id="fuelPolicy" name="fuelPolicy" placeholder="Escribe aquí" onChange={onPoliciesFormFieldChange} required/>
                                {(!valid.policies && policiesForm.fuelPolicy?.length === 0) && <span className={styles.warning}>Este dato es requerido</span>}
                            </div>
                            <div>
                                <h6>Politica de llegada con Retraso</h6>
                                <label htmlFor="delayPolicy">Descripción</label>
                                <textarea className={(!valid.policies && policiesForm.delayPolicy?.length === 0) ? styles.borderWarning : undefined} rows={9} id="delayPolicy" name="delayPolicy" placeholder="Escribe aquí" onChange={onPoliciesFormFieldChange} required/>
                                {(!valid.policies && policiesForm.delayPolicy?.length === 0) && <span className={styles.warning}>Este dato es requerido</span>}
                            </div>  
                            <div>
                                <h6>Conductores autorizados y adicionales</h6>
                                <label htmlFor="driverPolicy">Descripción</label>
                                <textarea className={(!valid.policies && policiesForm.driverPolicy?.length === 0) ? styles.borderWarning : undefined} rows={9} id="driverPolicy" name="driverPolicy" placeholder="Escribe aquí" onChange={onPoliciesFormFieldChange} required/>
                                {(!valid.policies && policiesForm.driverPolicy?.length === 0) && <span className={styles.warning}>Este dato es requerido</span>}
                            </div>
                        </div>
                    </div> 
                    <div className={styles.images}>
                        <h5>Agregar Imágenes</h5>
                        {imgForms.map(imagesMapper)}
                    </div> 
                    <button type="submit" onClick={onSubmitClicked}>Crear</button> 
                    {productAddFailed && <span className={styles.warning}><IoAlertCircleOutline className={styles.alertIcon}/>Lamentablemente el producto no ha podido crearse. Por favor intente más tarde</span>}  
                </form>
            </div>
        </>
    )
}

export default ProductForm;