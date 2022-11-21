import React from "react";
import style from "../../styles/card.module.css";


function Card(props) {
  const onLocalShowMoreClicked = () => {
    props.onParentShowMoreClicked();
  }
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
          <p className={style.location}>{props.location}</p>
          <p className={style.title}>{props.title}</p>
          <p className={style.description}>{props.description}</p>
          <button
            className={style.buttonCard}
            onClick={onLocalShowMoreClicked}
          >
            Ver más
          </button>
        </div>
      </div>
    </>
  );
}

export default Card;
