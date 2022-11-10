import React, { useState, useEffect } from "react";
import style from "../../styles/categories.module.css";
import categoryService from "../../services/categoryService";
import productService from "../../services/productService";
import Card from "./Card";


function Categories() {
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([]);

    const categoryMapper = (category) => (
        <div
            key={`category-${category.id}`}
            className={style.card}
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

    useEffect(() => {
        categoryService
        .getAll()
        .then((response) => {
            setCategories(response.data);
        })

        productService
        .getAll()
        .then((response) => {
            setProducts(response.data);
        })
        .catch(error => console.log(error))
    }, []);

    return (
        <>
            <div className={style.parentContainer}>
                <div className={style.subtitle}>
                    <h2>Buscar por tipo de vehiculo</h2>
                </div>
                <div className={style.categoriesContainer}>
                    {categories.map(categoryMapper)}
                </div>
            </div>
            <div className={style.recomendations}>
                <div className={style.subtitle}>
                    <h2>Recomendaciones</h2>
                </div>
                <div className={style.list}>
                    {products.map(productMapper)}
                </div>
            </div>
        </>
    );
}

export default Categories;
