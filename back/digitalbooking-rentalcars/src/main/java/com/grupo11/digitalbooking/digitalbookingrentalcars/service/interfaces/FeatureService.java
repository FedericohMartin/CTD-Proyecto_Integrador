package com.grupo11.digitalbooking.digitalbookingrentalcars.service.interfaces;

import com.grupo11.digitalbooking.digitalbookingrentalcars.model.Feature;
import java.util.List;
import java.util.Optional;

public interface FeatureService {

    Feature addFeature(Feature feature);

    Optional<Feature> searchFeature(Integer id);

    Feature updateFeature(Feature feature);

    void deleteFeature(Integer id) throws Exception;

    List<Feature> listFeatures();

}
