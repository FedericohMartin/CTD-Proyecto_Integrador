package com.grupo11.digitalbooking.digitalbookingrentalcars.service.interfaces;

import com.grupo11.digitalbooking.digitalbookingrentalcars.model.City;
import java.util.List;
import java.util.Optional;

public interface CityService {

    City addCity(City city);

    Optional<City> searchCity(Integer id);

    City updateCity(City city);

    void deleteCity(Integer id) throws Exception;

    List<City> listCities();

}
