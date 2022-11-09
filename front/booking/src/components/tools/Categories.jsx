import React, { useState, useEffect } from "react";
import style from "../../styles/categories.module.css";
import categoryService from "../../services/categoryService";
import products from "../../data/cardElements.json";
import Card from "./Card";


function Categories() {
    const [categories, setCategories] = useState([])

    const categoryMapper = (category) => (
        <div
            key={`category-${category.id}`}
            className={style.card}
        >
            <img src={category.imgUrl} alt="imagen categoria" />
            <h3>{category.title === "PequeÃ±o" ? "Pequeño" : category.title}</h3>
            <p>{category.description}</p>
        </div>
    )

    useEffect(() => {
        categoryService
        .getAll()
        .then((response) => {
            setCategories(response.data);
        })
    }, []);

    return (
        <>
            <div className={style.parentContainer}>
                <div className={style.subtitle}>
                    <h2>Buscar por tipo de vehiculo</h2>
                </div>
                <div className={style.container}>
                    {categories.map(categoryMapper)}
                </div>
            </div>
            <div>
                <div className={style.subtitle}>
                    <h2>Recomendaciones</h2>
                </div>
                <div className={style.list}>
                    {products.map((card, index) => (
                        <Card
                            key={index}
                            img={card.image}
                            category={card.category}
                            location={card.location}
                            title={card.title}
                            description={card.description}
                        />))}
                </div>
            </div>
        </>
    );
}

export default Categories;
