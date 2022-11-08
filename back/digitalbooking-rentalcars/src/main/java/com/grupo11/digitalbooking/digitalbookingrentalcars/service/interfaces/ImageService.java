package com.grupo11.digitalbooking.digitalbookingrentalcars.service.interfaces;

import com.grupo11.digitalbooking.digitalbookingrentalcars.model.Image;
import java.util.List;
import java.util.Optional;

public interface ImageService {

    Image addImage(Image image);

    Optional<Image> searchImage(Integer id);

    Image updateImage(Image image);

    void deleteImage(Integer id) throws Exception;

    List<Image> listImages();

}
