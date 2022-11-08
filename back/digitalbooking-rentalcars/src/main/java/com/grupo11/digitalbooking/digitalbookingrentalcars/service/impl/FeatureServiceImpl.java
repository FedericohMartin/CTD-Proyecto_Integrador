package com.grupo11.digitalbooking.digitalbookingrentalcars.service.impl;

import com.grupo11.digitalbooking.digitalbookingrentalcars.model.Feature;
import com.grupo11.digitalbooking.digitalbookingrentalcars.repository.FeatureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class FeatureServiceImpl {
    private final FeatureRepository featureRepository;


    @Autowired
    public FeatureServiceImpl(FeatureRepository featureRepository) {
        this.featureRepository = featureRepository;
    }

    //AGREGAR
    public Feature addFeature(Feature feature){
        return featureRepository.save(feature);
    }


    //ACTUALIZAR
    public Feature updateFeature(Feature feature){
        return featureRepository.save(feature);
    }

    //BUSCAR POR ID
    public Optional<Feature> searchFeature(Integer id){
        return featureRepository.findById(id);
    }

    //ELIMINAR POR ID
    public void deleteFeature(Integer id) throws Exception{
        Optional<Feature> searchedFeature = searchFeature(id);
        if (searchedFeature.isPresent())
            featureRepository.deleteById(id);
        else
            throw new Exception("Feature not found");
    }

    //LISTAR TODAS
    public List<Feature> listFeature(){
        List<Feature> features = featureRepository.findAll();
        return features;
    }

}
