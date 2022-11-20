import React, { useState } from "react";
import styles from '../../styles/photoGallery.module.css'
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';


function CarouselGallery(props) {
  return (
    <Carousel 
    className={props.mobile} 
    interval={props.interval}
    controls={props.controls}
    indicators={props.indicators}>
      <Carousel.Item className={styles.item}>
        <img
          className={`d-block w-100 ${styles.picture}`}
          src="https://picsum.photos/500"
          alt="First slide"
        />
        <Carousel.Caption>
          <h5>1/3</h5>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className={styles.item}>
        <img
          className={`d-block w-100 ${styles.picture}`}
          src="https://picsum.photos/500"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h5>2/3</h5>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className={styles.item}>
        <img
          className={`d-block w-100 ${styles.picture}`}
          src="https://picsum.photos/500"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5>3/3</h5>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

function ModalGallery(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      className={styles.modalWindow}
      centered
    >
      <Modal.Header className={props.modalHeader} closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        </Modal.Title>
        </Modal.Header>
        <Modal.Body className={props.modalBody}>
            <CarouselGallery
            interval={null}/>
        </Modal.Body>
        <Modal.Footer className={props.modalFooter}>
        </Modal.Footer>
    </Modal>
  );
}

function PhotoGallery(){
    const [modalShow, setModalShow] = useState(false);
    const onShowModalClicked = () => {
        setModalShow(true);
    }
    const onHideClicked = () => {
        setModalShow(false);
    }

    return(
        <>
            <div className={`${styles.galleryContainer} ${styles.desktop}`}>
                <div className={styles.mainPhoto}>
                    <img src="https://picsum.photos/500" alt="" />
                </div>
                <div className={styles.secondaryPictures}>
                    <img src="https://picsum.photos/500" alt="" />
                    <img src="https://picsum.photos/500" alt="" />
                    <img src="https://picsum.photos/500" alt="" />
                    <img src="https://picsum.photos/500" alt="" />
                </div>
                <div className={styles.seeMore}>
                    <div onClick={onShowModalClicked}>Ver más</div>
                </div>
                <ModalGallery
                    show={modalShow}
                    onHide={onHideClicked}
                    modalHeader={styles.modalHeader}
                    modalFooter={styles.modalFooter}
                    modalBody={styles.modalBody}
                />
            </div>
            <CarouselGallery 
                mobile={styles.mobile}
                interval={3000}
                controls={false}
                indicators={false}/>
        </>
            
    )
}

export default PhotoGallery;