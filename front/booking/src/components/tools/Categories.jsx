import style from "../../styles/categories.module.css";
import Card from "./Card";


function Categories(props) {

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
                <div className={style.list}>
                    {props.products.length !== 0 ? props.products.map(productMapper) : <div>No se encontraron productos</div>}
                </div>
            </div>
        </>
    );
}

export default Categories;
