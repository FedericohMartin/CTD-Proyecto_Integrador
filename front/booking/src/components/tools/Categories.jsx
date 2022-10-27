import React, { useState, useEffect } from "react";
import style from "../../styles/categories.module.css";
import category from "../../data/categoriesData.json";
import products from "../../data/cardElements.json";
import Card from "./Card";


function Categories() {

    return (
        <>
            <div>
                <div className={style.subtitle}>
                    <h2>Buscar por tipo de vehiculo</h2>
                </div>
                <div className={style.container}>
                    {category.map((card, index) => (
                        <div
                            key={index}
                            className={style.card}
                        >
                            <img src={card.image} alt="imagen categoria" />
                            <h3>{card.title}</h3>
                            <p>{card.description}</p>
                        </div>
                    ))}
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
