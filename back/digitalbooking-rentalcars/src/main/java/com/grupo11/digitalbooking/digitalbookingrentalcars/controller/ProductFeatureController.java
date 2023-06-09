package com.grupo11.digitalbooking.digitalbookingrentalcars.controller;

import com.grupo11.digitalbooking.digitalbookingrentalcars.handler.ResponseHandler;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.ProductFeature;
import com.grupo11.digitalbooking.digitalbookingrentalcars.service.interfaces.ProductFeatureService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Api(tags = "ProductsFeatures")
@RequestMapping("/productsFeatures")

public class ProductFeatureController {

    @Autowired
    private ProductFeatureService productFeatureService;

    @ApiOperation(value="searchAllProdFeat", notes="Lista de todas las relaciones producto-característica")
    @GetMapping("/bringAll")
    public ResponseEntity<Object> searchAllProdFeat(){
        return ResponseHandler.generateResponse("List of all product-characteristic relationships", HttpStatus.OK, productFeatureService.listProdFeat());
    }

    @ApiOperation(value="addProdFeat", notes="Agregar una nueva relación producto-característica")
    @PostMapping("/addProdFeat")
    public ResponseEntity<Object> addProdFeat(@RequestBody ProductFeature prodFeat){
        return ResponseHandler.generateResponse("The product-feature relationship has been added successfully", HttpStatus.OK, productFeatureService.addProdFeat(prodFeat));
    }

    @ApiOperation(value="searchProdFeat", notes="Buscar relación producto-característica por su ID")
    @GetMapping("/searchProdFeatById/{id}")
    public ResponseEntity<Object> searchProdFeat(@PathVariable Integer id){
        ResponseEntity<Object> response=null;

        if (id != null && productFeatureService.searchProdFeat(id).isPresent())
            response = ResponseHandler.generateResponse("Product-characteristic relationship found", HttpStatus.OK, productFeatureService.searchProdFeat(id));
        else
            response = ResponseHandler.generateResponse("Product-characteristic relationship NOT found",HttpStatus.NOT_FOUND,null);

        return response;
    }

    @ApiOperation(value = "updateProdFeat", notes = "Actualizar relación producto-característica")
    @PutMapping("/updateProdFeat")
    public ResponseEntity<Object> updateProdFeat(@RequestBody ProductFeature prodFeat){
        ResponseEntity<Object> response=null;

        if (prodFeat.getId() != null && productFeatureService.searchProdFeat(prodFeat.getId()).isPresent())
            response = ResponseHandler.generateResponse("The product-feature relationship has been successfully updated", HttpStatus.OK, productFeatureService.updateProdFeat(prodFeat));
        else
            response = ResponseHandler.generateResponse("Product-characteristic relationship NOT found",HttpStatus.NOT_FOUND,null);

        return response;
    }

    @ApiOperation(value = "deleteProdFeat", notes = "Eliminar relación producto-característica por su ID")
    @DeleteMapping("/deleteProdFeat/{id}")
    public ResponseEntity<Object> deleteProdFeat(@PathVariable Integer id) throws Exception {
        ResponseEntity<Object> response = null;

        if (productFeatureService.searchProdFeat(id).isPresent()) {

            productFeatureService.deleteProdFeat(id);
            response = ResponseHandler.generateResponse("Product-feature relationship removed", HttpStatus.OK, null);

        }else {
            response = ResponseHandler.generateResponse("Product-characteristic relationship NOT found", HttpStatus.NOT_FOUND, null);
        }
        return response;
    }

    @ApiOperation(value="listFeatByProduct", notes="Lista de características por ID de producto")
    @GetMapping("/listFeatByProduct/{id}")
    public ResponseEntity<Object> listFeatByProduct(@PathVariable Integer id) throws Exception{
        ResponseEntity<Object> response = null;
        if (productFeatureService.searchByProduct(id).isEmpty()){
            response = ResponseHandler.generateResponse("The product has no associated features", HttpStatus.NOT_FOUND, null);
        }else {
            response=ResponseHandler.generateResponse("Features list", HttpStatus.OK, productFeatureService.searchByProduct(id));
        }
        return response;
    }

}