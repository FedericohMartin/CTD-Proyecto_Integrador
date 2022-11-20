package com.grupo11.digitalbooking.digitalbookingrentalcars.service.impl;

import com.grupo11.digitalbooking.digitalbookingrentalcars.model.ProductImage;
import com.grupo11.digitalbooking.digitalbookingrentalcars.repository.ImageRepository;
import com.grupo11.digitalbooking.digitalbookingrentalcars.repository.ProductImageRepository;
import com.grupo11.digitalbooking.digitalbookingrentalcars.repository.ProductRepository;
import com.grupo11.digitalbooking.digitalbookingrentalcars.service.interfaces.ProductImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductImageServiceImpl implements ProductImageService {

    private final ProductImageRepository productImageRepository;
    private final ProductRepository productRepository;
    private final ImageRepository imageRepository;
    @Autowired
    public ProductImageServiceImpl(ProductImageRepository productImageRepository,
                                   ProductRepository productRepository,
                                   ImageRepository imageRepository) {
        this.productImageRepository = productImageRepository;
        this.productRepository = productRepository;
        this.imageRepository = imageRepository;
    }




    public ProductImage addProdImg(ProductImage prodImage){

        return productImageRepository.save(prodImage);
    }

    public Optional<ProductImage> searchProdImg(Integer id){

        return productImageRepository.findById(id);
    }

    public ProductImage updateProdImg(ProductImage productImage){
        return productImageRepository.save(productImage);
    }

    public void deleteProdImg(Integer id) throws Exception {
        Optional<ProductImage> searchedProdFeat = searchProdImg(id);
        if (searchedProdFeat.isPresent())
            productImageRepository.deleteById(id);
        else
            throw new Exception("Product-image relationship not found");
    }

    public List<ProductImage> listProdImg(){

        List<ProductImage> prodImg = productImageRepository.findAll();

        return prodImg;
    }

    public List<ProductImage> searchByProduct(Integer productId){

        return productImageRepository.findByProductId(productId);
    }
}
