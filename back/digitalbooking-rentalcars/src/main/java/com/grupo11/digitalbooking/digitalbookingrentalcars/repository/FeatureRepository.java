package com.grupo11.digitalbooking.digitalbookingrentalcars.repository;

import com.grupo11.digitalbooking.digitalbookingrentalcars.model.Feature;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FeatureRepository extends JpaRepository<Feature, Integer> {
    @Query( value = "select F.* from features F where F.id in :ids", nativeQuery = true )
    List<Feature> findByFeatureIds(@Param("ids") List<Integer> featureIdList);

    @Query( value = "select F.* from features F where F.icon=:icon and F.name=:name", nativeQuery = true )
    Optional<Feature> findByFeatureIconAndName(String icon, String name);
}
