package com.grupo11.digitalbooking.digitalbookingrentalcars.controller;

import com.grupo11.digitalbooking.digitalbookingrentalcars.handler.ResponseHandler;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.City;
import com.grupo11.digitalbooking.digitalbookingrentalcars.service.interfaces.CityService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Api(tags = "Cities")
@RequestMapping("/cities")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CityController {
    @Autowired
    private CityService cityService;

    @ApiOperation(value="addCity", notes="Agregar una nueva ciudad")
    @PostMapping
    public ResponseEntity<Object> addCity(@RequestBody City city) {
        return ResponseHandler.generateResponse("The city has been added successfully", HttpStatus.OK,cityService.addCity(city));
    }

    @ApiOperation(value="searchCityById", notes="Buscar una ciudad por su ID")
    @GetMapping("/{id}")
    public ResponseEntity<Object> searchCityById(@PathVariable Integer id) {
        ResponseEntity<Object> response=null;

        if (id != null && cityService.searchCity(id).isPresent())
            response = ResponseHandler.generateResponse("City found", HttpStatus.OK, cityService.searchCity(id));
        else
            response = ResponseHandler.generateResponse("City NOT found",HttpStatus.NOT_FOUND,null);

        return response;
    }

    @ApiOperation(value = "updateCity", notes = "Actualizar una ciudad")
    @PutMapping()
    public ResponseEntity<Object> updateCity(@RequestBody City city) {
        ResponseEntity<Object> response=null;

        if (city.getId() != null && cityService.searchCity(city.getId()).isPresent())
            response = ResponseHandler.generateResponse("The city has been successfully updated", HttpStatus.OK, cityService.updateCity(city));
        else
            response = ResponseHandler.generateResponse("City NOT found",HttpStatus.NOT_FOUND,null);

        return response;
    }

    @ApiOperation(value = "deleteCity", notes = "Eliminar una ciudad por su ID")
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteCity(@PathVariable Integer id) throws Exception {
        ResponseEntity<Object> response = null;

        if (cityService.searchCity(id).isPresent()) {

            cityService.deleteCity(id);
            response = ResponseHandler.generateResponse("City deleted", HttpStatus.OK, null);

        }else {
            response = ResponseHandler.generateResponse("City NOT found", HttpStatus.NOT_FOUND, null);
        }
        return response;
    }

    @ApiOperation(value="listCities", notes="Listar todas las ciudades")
    @GetMapping()
    public ResponseEntity<Object> listCities() {
        return ResponseHandler.generateResponse("List of all Cities", HttpStatus.OK, cityService.listCities());
    }
}