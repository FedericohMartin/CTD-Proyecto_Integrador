package com.grupo11.digitalbooking.digitalbookingrentalcars.controller;

import com.grupo11.digitalbooking.digitalbookingrentalcars.handler.ResponseHandler;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.Feature;
import com.grupo11.digitalbooking.digitalbookingrentalcars.service.interfaces.FeatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/features")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class FeatureController {
    @Autowired
    private FeatureService featureService;


    @PostMapping("/addFeature")
    public ResponseEntity<Object> addFeature(@RequestBody Feature feature){
        return ResponseHandler.generateResponse("The feature has been added successfully", HttpStatus.OK,featureService.addFeature(feature));
    }

    @GetMapping("/searchFeature/{id}")
    public ResponseEntity<Object> searchFeature(@PathVariable Integer id){
        ResponseEntity<Object> response=null;

        if (id != null && featureService.searchFeature(id).isPresent())
            response = ResponseHandler.generateResponse("Feature found", HttpStatus.OK, featureService.searchFeature(id));
        else
            response = ResponseHandler.generateResponse("Feature not found",HttpStatus.NOT_FOUND,null);

        return response;

    }

    @DeleteMapping("/deleteFeature/{id}")
    public ResponseEntity<Object> deleteFeature(@PathVariable Integer id) throws Exception {
        ResponseEntity<Object> response = null;

        if (featureService.searchFeature(id).isPresent()) {

            featureService.deleteFeature(id);
            response = ResponseHandler.generateResponse("Deleted feature", HttpStatus.OK, null);

        } else {
            response = ResponseHandler.generateResponse("Feature not found", HttpStatus.NOT_FOUND, null);
        }
        return response;
    }

    @PutMapping("/updateFeature")
    public ResponseEntity<Object> updateFeature(@RequestBody Feature feature){
        ResponseEntity<Object> response=null;

        if (feature.getId() != null && featureService.searchFeature(feature.getId()).isPresent())
            response = ResponseHandler.generateResponse("The feature has been successfully updated", HttpStatus.OK, featureService.updateFeature(feature));
        else
            response = ResponseHandler.generateResponse("Feature not found",HttpStatus.NOT_FOUND,null);

        return response;
    }

    @GetMapping("/listFeatures")
    public ResponseEntity<Object> listFeatures(){
        return ResponseHandler.generateResponse("List of all features", HttpStatus.OK, featureService.listFeatures());
    }
}
