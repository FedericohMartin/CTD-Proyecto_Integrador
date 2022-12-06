package com.grupo11.digitalbooking.digitalbookingrentalcars.service.impl;

import com.grupo11.digitalbooking.digitalbookingrentalcars.model.Feature;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.Product;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.ProductFeature;
import com.grupo11.digitalbooking.digitalbookingrentalcars.repository.FeatureRepository;
import com.grupo11.digitalbooking.digitalbookingrentalcars.repository.ProductFeatureRepository;
import com.grupo11.digitalbooking.digitalbookingrentalcars.repository.ProductRepository;
import com.grupo11.digitalbooking.digitalbookingrentalcars.service.interfaces.ProductFeatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProductFeatureServiceImpl implements ProductFeatureService {

    private final ProductFeatureRepository productFeatureRepository;
    private final ProductRepository productRepository;
    private final FeatureRepository featureRepository;

    @Autowired
    public ProductFeatureServiceImpl(ProductFeatureRepository productFeatureRepository, ProductRepository productRepository, FeatureRepository featureRepository) {
        this.productFeatureRepository = productFeatureRepository;
        this.featureRepository= featureRepository;
        this.productRepository= productRepository;
    }

    public ProductFeature addProdFeat(ProductFeature prodFeat){

        Optional<Product> product = productRepository.findById(prodFeat.getProduct().getId());
        prodFeat.setProduct(product.get());
        Optional<Feature> feature = featureRepository.findById(prodFeat.getFeature().getId());
        prodFeat.setFeature(feature.get());

        return productFeatureRepository.save(prodFeat);
    }

    public Optional<ProductFeature> searchProdFeat(Integer id){

        return productFeatureRepository.findById(id);
    }

    public ProductFeature updateProdFeat(ProductFeature prodFeat){
        Optional<Product> product =  productRepository.findById(prodFeat.getProduct().getId());
        prodFeat.setProduct(product.get());
        Optional<Feature> feature =  featureRepository.findById(prodFeat.getFeature().getId());
        prodFeat.setFeature(feature.get());

        return productFeatureRepository.save(prodFeat);
    }

    public void deleteProdFeat(Integer id) throws Exception {
        Optional<ProductFeature> searchedProdFeat = searchProdFeat(id);
        if (searchedProdFeat.isPresent())
            productFeatureRepository.deleteById(id);
        else
            throw new Exception("Product-feature relationship not found");
    }

    public List<ProductFeature> listProdFeat(){

        List<ProductFeature> prodFeat = productFeatureRepository.findAll();

        return prodFeat;
    }

    public List<ProductFeature> searchByProduct(Integer id){

        return productFeatureRepository.findByProductId(id);
    }
}
