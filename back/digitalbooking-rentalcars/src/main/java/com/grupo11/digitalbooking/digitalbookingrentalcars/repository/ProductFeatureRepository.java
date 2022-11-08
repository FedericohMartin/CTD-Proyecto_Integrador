package com.grupo11.digitalbooking.digitalbookingrentalcars.repository;

import com.grupo11.digitalbooking.digitalbookingrentalcars.model.ProductFeature;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductFeatureRepository extends JpaRepository<ProductFeature, Integer> {
    List<ProductFeature> findByProductId(Integer products_id);

}
