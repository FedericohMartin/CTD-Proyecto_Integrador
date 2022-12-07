package com.grupo11.digitalbooking.digitalbookingrentalcars.controller;

import com.grupo11.digitalbooking.digitalbookingrentalcars.handler.ResponseHandler;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.Image;
import com.grupo11.digitalbooking.digitalbookingrentalcars.service.interfaces.ImageService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Api(tags = "Images")
@RequestMapping("/images")

public class ImageController {
    @Autowired
    private ImageService imageService;

    @ApiOperation(value="addImagen", notes="Agregar una nueva imagen")
    @PostMapping("/addImage")
    public ResponseEntity<Object> addImagen(@RequestBody Image image){
        return ResponseHandler.generateResponse("The image has been added successfully", HttpStatus.OK,imageService.addImage(image));
    }

    @ApiOperation(value="searchImage", notes="Buscar una imagen por su ID")
    @GetMapping("/searchImage/{id}")
    public ResponseEntity<Object> searchImage(@PathVariable Integer id){
        ResponseEntity<Object> response=null;

        if (id != null && imageService.searchImage(id).isPresent())
            response = ResponseHandler.generateResponse("Found image", HttpStatus.OK, imageService.searchImage(id));
        else
            response = ResponseHandler.generateResponse("Image NOT found",HttpStatus.NOT_FOUND,null);

        return response;
    }

    @ApiOperation(value = "updateImage", notes = "Actualizar una imagen")
    @PutMapping("/updateImage")
    public ResponseEntity<Object> updateImage(@RequestBody Image image){
        ResponseEntity<Object> response=null;

        if (image.getId() != null && imageService.searchImage(image.getId()).isPresent())
            response = ResponseHandler.generateResponse("The image has been updated successfully", HttpStatus.OK, imageService.updateImage(image));
        else
            response = ResponseHandler.generateResponse("Image NOT found",HttpStatus.NOT_FOUND,null);

        return response;
    }

    @ApiOperation(value = "deleteImage", notes = "Eliminar una imagen por su ID")
    @DeleteMapping("/deleteImage/{id}")
    public ResponseEntity<Object> deleteImage(@PathVariable Integer id) throws Exception{
        ResponseEntity<Object> response = null;

        if (imageService.searchImage(id).isPresent())
            imageService.deleteImage(id);
        else
            response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();

        return response;
    }

    @ApiOperation(value="listImages", notes="Listar todas las imágenes")
    @GetMapping("/listImages")
    public ResponseEntity<Object> listImages(){
        return ResponseHandler.generateResponse("List of all Images", HttpStatus.OK, imageService.listImages());
    }
}

