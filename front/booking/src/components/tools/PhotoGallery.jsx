import React, { useState } from "react";
import styles from '../../styles/photoGallery.module.css'
import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';


function CarouselGallery(props) {

  const defaultImages = Array.from({length: 5}, (_, i) => {return i})

  const imagesMapper = (image,i) => {
    return(<Carousel.Item key={"image-"+image.id} className={styles.item}>
        <img
          className={`d-block w-100 ${styles.picture}`}
          src={image.image.imgUrl}
          alt={"slide-"+(i+1)}
        />
        <Carousel.Caption>
          <h5>{i+1}</h5>
        </Carousel.Caption>
        </Carousel.Item>)
  }

  const defaultImagesMapper = (number) => {
    if(number === 0){
      return(<Carousel.Item key={"image-"+number+1} className={styles.item}>
      <img
        className={`d-block w-100 ${styles.picture}`}
        src={props.product.category?.imgUrl}
        alt={"slide-"+number+1}
      />
      <Carousel.Caption>
        <h5>{number+1}</h5>
      </Carousel.Caption>
      </Carousel.Item>)
    }
    return(<Carousel.Item key={"image-"+number+1} className={styles.item}>
    <img
      className={`d-block w-100 ${styles.picture}`}
      src="https://picsum.photos/500"
      alt={"slide-"+number+1}
    />
    <Carousel.Caption>
      <h5>{number+1}</h5>
    </Carousel.Caption>
    </Carousel.Item>)
  }

  return (
    <Carousel 
    className={props.mobile} 
    interval={props.interval}
    controls={props.controls}
    indicators={props.indicators}>
      {props.product?.images?.length !== 0 ? props.product?.images?.map(imagesMapper) : defaultImages.map(defaultImagesMapper)}
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
      <Modal.Header className={props.modalHeader}>
      <CloseButton variant="white" onClick={props.onHide} />
        <Modal.Title id="contained-modal-title-vcenter">
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={props.modalBody}>
          <CarouselGallery
          interval={null}
          product={props.product}/>
      </Modal.Body>
      <Modal.Footer className={props.modalFooter}>
      </Modal.Footer>
    </Modal>
  );
}

function PhotoGallery({product, isLoaded, isCalendarLoaded}){
    const [modalShow, setModalShow] = useState(false);
    const loaders = Array.from({length: 4}, (_, i) => {return i})

    const imagesMapper = (image, i) =>{
      if(i>0 && i<=4){
        return (<img src={image.image.imgUrl} alt={image.id} key={"image-"+image.id}/>)
      }
    }
    const defaultImagesMapper = (n) => (<img src="https://picsum.photos/500" alt={n} key={"image-"+n}/>)

    const loaderMapper = (loader) => {
      return(
          <div key={loader} className={styles.secondaryImagesLoader}></div>
      )
    }
    const onShowModalClicked = () => {
        setModalShow(true);
    }
    const onHideClicked = () => {
        setModalShow(false);
    }

    const filterImages = (image) => {
      return image.image?.name?.includes('Primary');
    }

    const image = product.images?.length !== 0 && product.images?.find(filterImages);
    const imageUrl = image 
    ? image.image.imgUrl 
    : product.images?.length !== 0
        ? product.images[0].image?.imgUrl 
        : product.category?.imgUrl

    return(
        <>
            <div className={`${styles.galleryContainer} ${styles.desktop}`}>
                {isLoaded && isCalendarLoaded
                ?<div className={styles.mainPhoto}>
                    <img src={imageUrl} alt="Main" />
                </div>
                : <div className={`${styles.mainPhoto} ${styles.mainPhotoLoader}`}></div>}
                {isLoaded && isCalendarLoaded
                ?<div className={styles.secondaryPictures}>
                    {product.images?.length !== 0 ? product.images?.map(imagesMapper) : loaders.map(defaultImagesMapper)}
                </div>
                : <div className={styles.secondaryPictures}>
                  {loaders.map(loaderMapper)}
                  </div>}
                <div className={styles.seeMore}>
                    <div onClick={onShowModalClicked}>Ver más</div>
                </div>
                <ModalGallery
                    show={modalShow}
                    onHide={onHideClicked}
                    modalHeader={styles.modalHeader}
                    modalFooter={styles.modalFooter}
                    modalBody={styles.modalBody}
                    product={product}
                />
            </div>
            {isLoaded && isCalendarLoaded
            ?<CarouselGallery 
                mobile={styles.mobile}
                interval={3000}
                controls={false}
                indicators={false}
                product={product}/>
            : <div className={styles.carouselLoader}></div>}
        </>
            
    )
}

export default PhotoGallery;