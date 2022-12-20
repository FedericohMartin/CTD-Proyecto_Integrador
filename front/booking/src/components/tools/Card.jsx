import React from "react";
import style from "../../styles/card.module.css";


function Card(props) {
  const onLocalShowMoreClicked = () => {
    props.onParentShowMoreClicked();
  }
  
  const onLocalActionClicked = () => {
    props.onParentActionclicked(props.id);
  }


  return (
    <>
      <div className={`${style.card} ${props.customCard}`}>
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
          <div className={props.buttonContainer}>
            <button
              className={`${style.buttonCard} ${props.customButtonStyle}`}
              onClick={onLocalShowMoreClicked}
            >
              {props.firstButtonLabel}
            </button>
            {props.actionButtonLabel && 
            <button
              className={`${style.buttonCard} ${props.actionButton}`}
              onClick={onLocalActionClicked}
            >
              {props.actionButtonLabel}
            </button>}
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;