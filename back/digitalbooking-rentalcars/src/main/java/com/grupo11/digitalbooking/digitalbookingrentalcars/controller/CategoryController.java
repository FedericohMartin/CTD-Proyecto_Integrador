package com.grupo11.digitalbooking.digitalbookingrentalcars.controller;

import com.grupo11.digitalbooking.digitalbookingrentalcars.handler.ResponseHandler;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.Category;
import com.grupo11.digitalbooking.digitalbookingrentalcars.service.interfaces.CategoryService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//Request to the db
@RestController
@Api(tags = "Categories")
@RequestMapping("/categories")

public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @ApiOperation(value="addCategory", notes="Agregar una nueva categoría")
    @PostMapping
    public ResponseEntity<Object> addCategory(@RequestBody Category category){
        return ResponseHandler.generateResponse("The category has been added successfully", HttpStatus.CREATED,categoryService.addCategory(category));
    }

    @ApiOperation(value="searchCategory", notes="Buscar una categoría por su ID")
    @GetMapping("/{id}")
    public ResponseEntity<Object> searchCategory (@PathVariable Integer id){
        ResponseEntity<Object> response=null;

        if (id != null && categoryService.searchCategory(id).isPresent())
            response = ResponseHandler.generateResponse("Category found", HttpStatus.OK, categoryService.searchCategory(id));
        else
            response = ResponseHandler.generateResponse("Category NOT found",HttpStatus.NOT_FOUND,null);
        return response;
    }

    @ApiOperation(value = "updateCategory", notes = "Actualizar una categoría")
    @PutMapping()
    public ResponseEntity<Object> updateCategory(@RequestBody Category category){
        ResponseEntity<Object> response=null;

        if (category.getId() != null && categoryService.searchCategory(category.getId()).isPresent())
            response = ResponseHandler.generateResponse("The category has been updated successfully", HttpStatus.OK, categoryService.updateCategory(category));
        else
            response = ResponseHandler.generateResponse("Category NOT found",HttpStatus.NOT_FOUND,null);
        return response;
    }

    @ApiOperation(value = "deleteCategory", notes = "Eliminar una categoría por su ID")
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteCategory(@PathVariable Integer id) throws Exception {

        ResponseEntity<Object> response = null;

        if (categoryService.searchCategory(id).isPresent()) {
            categoryService.deleteCategory(id);
            response = ResponseHandler.generateResponseNoContent();
        }else {
            response = ResponseHandler.generateResponse("Category NOT found", HttpStatus.NOT_FOUND, null);
        }
        return response;
    }

    @ApiOperation(value="listCategories", notes="Listar todas las categorías")
    @GetMapping()
    public ResponseEntity<Object> listCategories(){
        return ResponseHandler.generateResponse("List of all categories", HttpStatus.OK, categoryService.listCategories());
    }
}
