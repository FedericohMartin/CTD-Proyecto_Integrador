package com.grupo11.digitalbooking.digitalbookingrentalcars.service.impl;

import com.grupo11.digitalbooking.digitalbookingrentalcars.model.Image;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.Product;
import com.grupo11.digitalbooking.digitalbookingrentalcars.repository.ImageRepository;
import com.grupo11.digitalbooking.digitalbookingrentalcars.repository.ProductRepository;
import com.grupo11.digitalbooking.digitalbookingrentalcars.service.interfaces.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ImageServiceImpl implements ImageService {
    private final ImageRepository imageRepository;
    private final ProductRepository productRepository;

    @Autowired
    public ImageServiceImpl(ImageRepository imageRepository, ProductRepository productRepository) {
        this.imageRepository = imageRepository;
        this.productRepository = productRepository;
    }

    public Image addImage(Image image){
        Optional<Product> product = productRepository.findById(image.getProduct().getId());
        image.setProduct(product.get());
        return imageRepository.save(image);
    }

    public Optional<Image> searchImage(Integer id){
        return imageRepository.findById(id);
    }

    public Image updateImage(Image image){
        Optional<Product> product = productRepository.findById(image.getProduct().getId());
        image.setProduct(product.get());
        return imageRepository.save(image);
    }

    public void deleteImage(Integer id) throws Exception {
        Optional<Image> searchedImage = searchImage(id);
        if (searchedImage.isPresent())
            imageRepository.deleteById(id);
        else
            throw new Exception("Image not found");
    }

    public List<Image> listImages(){
        List<Image>images= imageRepository.findAll();
        return images;
    }
}
