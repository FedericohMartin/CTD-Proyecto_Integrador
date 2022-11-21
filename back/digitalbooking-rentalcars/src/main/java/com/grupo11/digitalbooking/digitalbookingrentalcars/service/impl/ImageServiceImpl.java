package com.grupo11.digitalbooking.digitalbookingrentalcars.service.impl;

import com.grupo11.digitalbooking.digitalbookingrentalcars.model.Image;
import com.grupo11.digitalbooking.digitalbookingrentalcars.repository.ImageRepository;
import com.grupo11.digitalbooking.digitalbookingrentalcars.service.interfaces.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ImageServiceImpl implements ImageService {
    private final ImageRepository imageRepository;

    @Autowired
    public ImageServiceImpl(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    public Image addImage(Image image){
        return imageRepository.save(image);
    }

    public Optional<Image> searchImage(Integer id){
        return imageRepository.findById(id);
    }

    public Image updateImage(Image image){
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
