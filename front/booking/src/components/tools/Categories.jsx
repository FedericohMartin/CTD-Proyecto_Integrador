import { useCallback } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import style from "../../styles/categories.module.css";
import {FaRegSadCry} from "react-icons/fa";
import Card from "./Card";

function Pagination({onParentPrevClicked, onParentNextClicked, page, buttonContainer, btn, active, onParentNumberClicked, isLoaded, loader}){
    const onLocalPrevClicked = () => {
        onParentPrevClicked();
    }
    const onLocalNextClicked = () => {
        onParentNextClicked();
    }

    const onLocalNumberClicked = (e) => {
        onParentNumberClicked(e);
    }

    const pageNumberArray = Array.from({length: page.totalPages}, (v, i) => i+1);
    const pageNumbreComponents = pageNumberArray.map(n => <div key={`page-${n}`} className={n === page.pageNumber+1 ? active : undefined} onClick={onLocalNumberClicked} data-page={n-1}>{n}</div>)

    return(
        <>
            {isLoaded
            ? <div className={buttonContainer}>
                {page.totalPages !== 0 && <button className={btn} type="button" onClick={onLocalPrevClicked} disabled={page.pageNumber === 0}>{"<"}</button>}
                {pageNumbreComponents}
                {page.totalPages !== 0 && <button className={btn} type="button" onClick={onLocalNextClicked} disabled={page.totalPages-1 === page.pageNumber}>{">"}</button>}
            </div>
            : <div className={`${buttonContainer} ${loader}`}></div>} 
        </>
    )
}

function Categories(props) {
    const [pageComponents, setPageComponents] = useState([]);
    const navigate = useNavigate();
    const loaders = Array.from({length: 4}, (_, i) => {return i})

    const goToPage = useCallback((id) => {
        navigate(`/producto/${id}`);
     }, [navigate])

    const loaderMapper = (loader) => {
        return(
            <div key={loader} className={style.loader}></div>
        )
    }

    const categoryMapper = (category) => (
        <div
            key={`category-${category.id}`}
            className={style.card}
            onClick={() => {
                props.onParentClicked(category.id);
            }}
        >
            <img src={category.imgUrl} alt="imagen categoria" />
            <h3>{category.title}</h3>
            <p>{category.description}</p>
        </div>
    )

    const filterImages = (image) => {
        return image.image?.name?.includes('Primary');
    }


    const productMapper = useCallback((product) => {
        const image = product.images?.length !== 0 && product.images?.find(filterImages);
        const imageUrl = image ? image.image.imgUrl : product.category?.imgUrl
        return(
        <Card
            key={`product-${product.id}`}
            img={imageUrl}
            category={product.category?.title}
            location={`${product.city?.state}, ${product.city?.name}, ${product.city?.country}`}
            title={product.name}
            description={product.description}
            onParentShowMoreClicked={() => {
                goToPage(product.id);
            }}
            firstButtonLabel={"Ver más"}
        />)}, [goToPage])

    const onNextClicked = () => {
        props.onParentNextClicked();
    }

    const onPrevClicked = () => {
        props.onParentPrevClicked();
    }

    const onNumberClicked= (e) => {
        const targetPage = e.currentTarget.dataset.page;
        props.onParentNumberClicked(targetPage);
    }

    useEffect(() => {
        async function getProducts(){
            return await props.products;
        }
        getProducts().then(result => {
            setPageComponents(result.map(productMapper))
        });
        
        
    }, [props.products, productMapper])

    return (
        <>
            <div className={style.parentContainer}>
                <div className={style.subtitle}>
                    <h2>Buscar por tipo de vehiculo</h2>
                </div>
                <div className={style.categoriesContainer}>
                    {props.categoriesLoaded ? props.categories.map(categoryMapper) : loaders.map(loaderMapper)}
                </div>
            </div>
            <div className={style.recomendations}>
                <div className={style.subtitle}>
                    <h2>Recomendaciones</h2>
                </div>
                <Pagination 
                    onParentPrevClicked={onPrevClicked} 
                    onParentNextClicked={onNextClicked} 
                    page={props.page}
                    buttonContainer = {style.buttonContainer}
                    btn = {style.pageBtn}
                    active = {style.active}
                    onParentNumberClicked={onNumberClicked}
                    isLoaded={props.isLoaded}
                    loader={style.pageLoader}
                    />
                    <div className={style.list}>
                        {props.isLoaded 
                        ? pageComponents?.length !== 0 
                            ? pageComponents?.slice(props.page.pageNumber*4, 4*(props.page.pageNumber+1)) 
                            : <div className={style.notFound}><FaRegSadCry className={style.notFoundIcon}/>No encontramos productos para la búsqueda seleccionada</div> 
                        : loaders.map(loaderMapper)}
                    </div>
                  
            </div>
        </>
    );
}

export default Categories;
