package com.grupo11.digitalbooking.digitalbookingrentalcars.service.interfaces;

import com.grupo11.digitalbooking.digitalbookingrentalcars.model.ProductFeature;

import java.util.List;
import java.util.Optional;

public interface ProductFeatureService {

    ProductFeature addProdFeat(ProductFeature productFeature);

    Optional<ProductFeature> searchProdFeat(Integer id);

    ProductFeature updateProdFeat(ProductFeature productFeature);

    void deleteProdFeat(Integer id) throws Exception;

    List<ProductFeature> listProdFeat();

    List<ProductFeature> searchByProduct(Integer id);

}
