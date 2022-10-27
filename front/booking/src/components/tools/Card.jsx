import React, { useState, useEffect } from "react";
import style from "../../styles/card.module.css";
//import { FaFontAwesome, FontAwesome } from "react-icons/fa";
import {
  FaCar,
  FaStar
} from "react-icons/fa";
//import { IconName } from "react-icons/fa";


function Card(props) {

  return (
    <>
      <div className={style.card}>
        <div className={style.card_left}>
          <img
            src={props.img}
            className={style.imagen}
            alt="imagen vehiculo"
          ></img>
        </div>
        <div className={style.card_right}>
          <div className={style.iconBox}>
            <p className={style.category}>{props.category}</p>
          </div>
          <p className={style.location}></p>
          <p className={style.title}>{props.title}</p>
          <p className={style.description}>{props.description}</p>
          <button
            className={style.buttonCard}
          >
            Ver más
          </button>
        </div>
      </div>
    </>
  );
}

export default Card;