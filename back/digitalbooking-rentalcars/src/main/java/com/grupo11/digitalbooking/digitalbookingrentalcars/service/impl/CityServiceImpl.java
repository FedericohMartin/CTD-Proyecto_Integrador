package com.grupo11.digitalbooking.digitalbookingrentalcars.service.impl;

import com.grupo11.digitalbooking.digitalbookingrentalcars.model.City;
import com.grupo11.digitalbooking.digitalbookingrentalcars.repository.CityRepository;
import com.grupo11.digitalbooking.digitalbookingrentalcars.service.interfaces.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CityServiceImpl implements CityService {
    private final CityRepository cityRepository;
    @Autowired
    public CityServiceImpl(CityRepository ciudadRepository) {
        this.cityRepository = ciudadRepository;
    }


    public City addCity(City city){
        return cityRepository.save(city);
    }

    @Override
    public Optional<City> searchCity(Integer id) {
        return cityRepository.findById(id);
    }

    public Optional<City> searchCityById(Integer id){
        return cityRepository.findById(id);
    }

    public void deleteCity (Integer id)throws Exception{
        Optional<City> searchedCity = searchCityById(id);
        if (searchedCity.isPresent())
            cityRepository.deleteById(id);
        else
            throw new Exception("City not found");
    }

    public City updateCity(City city){
        return cityRepository.save(city);
    }

    public List<City> listCities(){
        List<City> cities= cityRepository.findAll();
        return cities;
    }
}
