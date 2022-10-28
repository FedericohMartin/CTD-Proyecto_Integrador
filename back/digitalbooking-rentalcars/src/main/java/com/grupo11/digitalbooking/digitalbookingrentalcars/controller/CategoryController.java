package com.grupo11.digitalbooking.digitalbookingrentalcars.controller;

import com.grupo11.digitalbooking.digitalbookingrentalcars.handler.ResponseHandler;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.Category;
import com.grupo11.digitalbooking.digitalbookingrentalcars.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//Request to the db
@RestController
@RequestMapping("/categories")

public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @PostMapping
    public ResponseEntity<Object> addCategory(@RequestBody Category category){
        return ResponseHandler.generateResponse("The category has been added successfully", HttpStatus.CREATED,categoryService.addCategory(category));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> searchCategory (@PathVariable Integer id){
        ResponseEntity<Object> response=null;

        if (id != null && categoryService.searchCategory(id).isPresent())
            response = ResponseHandler.generateResponse("Category found", HttpStatus.OK, categoryService.searchCategory(id));
        else
            response = ResponseHandler.generateResponse("Category NOT found",HttpStatus.NOT_FOUND,null);
        return response;
    }

    @PutMapping()
    public ResponseEntity<Object> updateCategory(@RequestBody Category category){
        ResponseEntity<Object> response=null;

        if (category.getIdCategories() != null && categoryService.searchCategory(category.getIdCategories()).isPresent())
            response = ResponseHandler.generateResponse("The category has been updated successfully", HttpStatus.OK, categoryService.updateCategory(category));
        else
            response = ResponseHandler.generateResponse("Category NOT found",HttpStatus.NOT_FOUND,null);
        return response;
    }

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

    @GetMapping()
    public ResponseEntity<Object> listCategories(){
        return ResponseHandler.generateResponse("List of all categories", HttpStatus.OK, categoryService.listCategories());
    }
}
