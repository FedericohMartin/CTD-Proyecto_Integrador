package com.grupo11.digitalbooking.digitalbookingrentalcars.controller;

import com.grupo11.digitalbooking.digitalbookingrentalcars.exceptions.BadRequestException;
import com.grupo11.digitalbooking.digitalbookingrentalcars.exceptions.ProductNotFoundException;
import com.grupo11.digitalbooking.digitalbookingrentalcars.handler.ResponseHandler;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.dto.ProductDTO;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.dto.ProductList;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.dto.ProductUpdateDTO;
import com.grupo11.digitalbooking.digitalbookingrentalcars.service.interfaces.ProductService;
import com.grupo11.digitalbooking.digitalbookingrentalcars.util.FilteredProduct;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@Api(tags = "Products")
@RequestMapping("/products")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProductController {

    @Autowired
    private ProductService productService;


    //Ticket Nº 21
    @ApiOperation(value="searchAllProducts", notes="Listar todos los productos")
    @GetMapping("/bringAll")
    public ResponseEntity<Object> searchAllProducts(){
        return ResponseHandler.generateResponse("List of all products", HttpStatus.OK, productService.listProduct());
    }


    @ApiOperation(value="addProduct", notes="Agregar un nuevo producto")
    @PostMapping("/addProduct")
    public ResponseEntity<Object> addProduct(@RequestBody ProductDTO productDTO){
        return ResponseHandler.generateResponse("The product has been added successfully", HttpStatus.OK, productService.addProduct(productDTO));
    }


    //Tickets Nº 15, 16, 17 y 73
    @ApiOperation(value="searchProduct", notes="Buscar un producto por su ID")
    @GetMapping("/searchProductById/{id}")
    public ResponseEntity<Object> searchProduct(@PathVariable Integer id){
        ResponseEntity<Object> response=null;

        if (id != null && productService.searchProduct(id).isPresent())
            response = ResponseHandler.generateResponse("Product found", HttpStatus.OK, productService.searchProduct(id));
        else
            response = ResponseHandler.generateResponse("Product not found",HttpStatus.NOT_FOUND,null);

        return response;
    }

    //Ticket Nº 73
    @ApiOperation(value = "updateProduct", notes = "Actualizar un producto")
    @PutMapping("/updateProduct")
    public ResponseEntity<Object> updateProduct(@RequestBody ProductUpdateDTO productDTO){
        try{
            return ResponseHandler.generateResponse("The product has been successfully updated", HttpStatus.OK, productService.updateProduct(productDTO));
        }catch(ProductNotFoundException ex){
            return ResponseHandler.generateResponse("Product not found",HttpStatus.NOT_FOUND,ex.getMessage());
        }catch(Exception ex){
            ex.printStackTrace();
            return ResponseHandler.generateResponse("Error to update product",HttpStatus.INTERNAL_SERVER_ERROR,ex.getMessage());
        }
    }


    @ApiOperation(value = "deleteProduct", notes = "Eliminar un producto por su ID")
    @DeleteMapping("/deleteProduct/{id}")
    public ResponseEntity<Object> deleteProduct(@PathVariable Integer id) throws Exception {
        ResponseEntity<Object> response = null;

        if (productService.searchProduct(id).isPresent()) {

            productService.deleteProduct(id);
            response = ResponseHandler.generateResponse("Removed product", HttpStatus.OK, null);

        }else {
            response = ResponseHandler.generateResponse("Product not found", HttpStatus.NOT_FOUND, null);
        }
        return response;
    }


    @ApiOperation(value="searchByCategory", notes="Listado de productos por ID de categoría")
    @GetMapping("/category/{id}")
    public ResponseEntity<Object> searchByCategory(@PathVariable Integer id){
        return ResponseHandler.generateResponse("List of Products with the searched category",HttpStatus.OK,productService.searchByCategory(id));
    }


    //Ticket Nº 34
    @ApiOperation(value="searchByCity", notes="Listado de productos por ID de ciudad")
    @GetMapping("/city/{id}")
    public ResponseEntity<Object> searchByCity(@PathVariable Integer id){
        return ResponseHandler.generateResponse("List of Products with the city searched",HttpStatus.OK,productService.searchByCity(id));
    }

    //Ticket Nº 55 (Implementar filtro por ciudad e intervalo de fechas)
    @ApiOperation(value="searchByCityAndDates", notes="Listado de productos por ID de ciudad y fecha de inicio/fecha final")
    @GetMapping("/search")
    public ResponseEntity<Object> searchByCityAndDates(@RequestParam Integer cityId, @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate initialDate, @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate finalDate) throws BadRequestException {
        FilteredProduct filter = new FilteredProduct();
        filter.setInitialDate(initialDate);
        filter.setFinalDate(finalDate);
        filter.setCityId(cityId);
        ProductList filteredProducts = productService.getProductsByCityAndDate(filter);
        return ResponseHandler.generateResponse("List of Products with the city and dates sought",HttpStatus.OK,filteredProducts);
    }

    @ApiOperation(value="searchByDates", notes="Listado de productos por fecha de inicio y fecha final")
    @GetMapping("/searchByDates")
    public ResponseEntity<Object> searchByDates(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate initialDate, @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate finalDate) throws BadRequestException {
        ProductList filteredProducts = productService.searchByDates(initialDate, finalDate);
        return ResponseHandler.generateResponse("List of Products with dates sought",HttpStatus.OK,filteredProducts);
    }

    //Ticket Nº 32
    @ApiOperation(value="randomProducts", notes="Listado de productos random")
    @GetMapping("/random")
    public ResponseEntity<Object> randomProducts(){
        return ResponseHandler.generateResponse("Random list of products", HttpStatus.OK, productService.randomProducts());
    }
}

