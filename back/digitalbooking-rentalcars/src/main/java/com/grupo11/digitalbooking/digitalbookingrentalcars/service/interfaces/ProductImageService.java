package com.grupo11.digitalbooking.digitalbookingrentalcars.service.interfaces;

import com.grupo11.digitalbooking.digitalbookingrentalcars.model.ProductImage;

import java.util.List;
import java.util.Optional;

public interface ProductImageService {

    ProductImage addProdImg(ProductImage productImage);

    Optional<ProductImage> searchProdImg(Integer id);

    ProductImage updateProdImg(ProductImage productImage);

    void deleteProdImg(Integer id) throws Exception;

    List<ProductImage> listProdImg();

    List<ProductImage> searchByProduct(Integer productId);

}
