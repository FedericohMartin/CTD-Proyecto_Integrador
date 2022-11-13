import { useEffect, useState } from "react";
import style from "../../styles/categories.module.css";
import Card from "./Card";

function Pagination({onParentPrevClicked, onParentNextClicked, page, buttonContainer, btn, active, onParentNumberClicked}){
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
    const pageNumbreComponents = pageNumberArray.map(n => <div className={n === page.pageNumber+1 && active} onClick={onLocalNumberClicked} data-page={n-1}>{n}</div>)

    return(
        <>
            <div className={buttonContainer}>
                <button className={btn} type="button" onClick={onLocalPrevClicked} disabled={page.pageNumber === 0}>{"<"}</button>
                {pageNumbreComponents}
                <button className={btn} type="button" onClick={onLocalNextClicked} disabled={page.totalPages-1 === page.pageNumber}>{">"}</button>
            </div>  
        </>
    )
}

function Categories(props) {
    const [pageComponents, setPageComponents] = useState([]);
    const [page, setPage] = useState({
        pageNumber: 0,
        totalPages: Math.trunc(17/4+1),
    });


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

    const productMapper = (product) => (
        <Card
            key={`product-${product.id}`}
            img={product.category?.imgUrl}
            category={product.category?.title}
            location={`${product.city?.state}, ${product.city?.name}, ${product.city?.country}`}
            title={product.name}
            description={product.description}
        />)

    const onNextClicked = () => {
        setPage(prevState => {
            const update = {...prevState};
            update.pageNumber++

            return update;
        })
    }

    const onPrevClicked = () => {
        setPage(prevState => {
            const update = {...prevState};
            update.pageNumber--

            return update;
        })
    }

    const onNumberClicked= (e) => {
        const targetPage = e.currentTarget.dataset.page;
        setPage(prevState => {
            const update = {...prevState};
            update.pageNumber = parseInt(targetPage);

            return update;
        })
    }

    useEffect(() => {
        setPageComponents(props.products.map(productMapper))
    }, [props.products])

    return (
        <>
            <div className={style.parentContainer}>
                <div className={style.subtitle}>
                    <h2>Buscar por tipo de vehiculo</h2>
                </div>
                <div className={style.categoriesContainer}>
                    {props.categories.map(categoryMapper)}
                </div>
            </div>
            <div className={style.recomendations}>
                <div className={style.subtitle}>
                    <h2>Recomendaciones</h2>
                </div>
                <Pagination 
                    onParentPrevClicked={onPrevClicked} 
                    onParentNextClicked={onNextClicked} 
                    page={page}
                    buttonContainer = {style.buttonContainer}
                    btn = {style.pageBtn}
                    active = {style.active}
                    onParentNumberClicked={onNumberClicked}
                    />
                    <div className={style.list}>
                        {pageComponents.length !== 0 ? pageComponents.slice(page.pageNumber*4, 4*(page.pageNumber+1)) : <div>No se encontraron productos</div>}
                    </div>
                  
            </div>
        </>
    );
}

export default Categories;
