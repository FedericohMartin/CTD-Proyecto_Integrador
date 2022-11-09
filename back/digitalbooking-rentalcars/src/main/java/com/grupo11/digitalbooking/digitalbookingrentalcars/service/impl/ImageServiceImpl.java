package com.grupo11.digitalbooking.digitalbookingrentalcars.service.impl;

import com.grupo11.digitalbooking.digitalbookingrentalcars.model.Image;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.Product;
import com.grupo11.digitalbooking.digitalbookingrentalcars.repository.ImageRepository;
import com.grupo11.digitalbooking.digitalbookingrentalcars.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ImageServiceImpl {
    private final ImageRepository imageRepository;
    private final ProductRepository productRepository;

    @Autowired
    public ImageServiceImpl(ImageRepository imageRepository, ProductRepository productRepository) {
        this.imageRepository = imageRepository;
        this.productRepository = productRepository;
    }

    //Agregar imagen
    public Image addImage(Image image){
        Optional<Product> product = productRepository.findById(image.getProduct().getId());
        image.setProduct(product.get());
        return imageRepository.save(image);
    }

    //Buscar imagen
    public Optional<Image> searchImage(Integer id){
        return imageRepository.findById(id);
    }

    //Actualizar imagen
    public Image updateImage(Image image){
        Optional<Product> product = productRepository.findById(image.getProduct().getId());
        image.setProduct(product.get());
        return imageRepository.save(image);
    }

    //Eliminar imagen
    public void deleteImage(Integer id) throws Exception {
        Optional<Image> searchedImage = searchImage(id);
        if (searchedImage.isPresent())
            imageRepository.deleteById(id);
        else
            throw new Exception("Image not found");
    }

    //Traer todas las imágenes
    public List<Image> listImage(){
        List<Image>images= imageRepository.findAll();
        return images;
    }
}
