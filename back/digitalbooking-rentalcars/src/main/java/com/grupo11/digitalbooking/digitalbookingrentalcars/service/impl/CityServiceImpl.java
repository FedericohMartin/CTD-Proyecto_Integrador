package com.grupo11.digitalbooking.digitalbookingrentalcars.service.impl;

import com.grupo11.digitalbooking.digitalbookingrentalcars.model.City;
import com.grupo11.digitalbooking.digitalbookingrentalcars.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

//CRUD CIUDADES
@Service
public class CityServiceImpl {
    private final CityRepository cityRepository;
    @Autowired
    public CityServiceImpl(CityRepository ciudadRepository) {
        this.cityRepository = ciudadRepository;
    }


    //AGREGAR
    public City addCity(City city){
        return cityRepository.save(city);
    }

    //BUSCAR POR ID
    public Optional<City> searchCityById(Integer id){
        return cityRepository.findById(id);
    }

    //ELIMINAR
    public void deleteCity (Integer id)throws Exception{
        Optional<City> searchedCity = searchCityById(id);
        if (searchedCity.isPresent())
            cityRepository.deleteById(id);
        else
            throw new Exception("City not found");
    }

    //ACTUALIZAR
    public City updateCity(City city){
        return cityRepository.save(city);
    }

    //LISTAR TODOS
    public List<City> listCities(){
        List<City> cities= cityRepository.findAll();
        return cities;
    }
}
