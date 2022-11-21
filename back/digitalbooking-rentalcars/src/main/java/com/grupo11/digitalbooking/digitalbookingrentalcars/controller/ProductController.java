package com.grupo11.digitalbooking.digitalbookingrentalcars.controller;

import com.grupo11.digitalbooking.digitalbookingrentalcars.exceptions.BadRequestException;
import com.grupo11.digitalbooking.digitalbookingrentalcars.handler.ResponseHandler;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.Product;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.dto.ProductDTO;
import com.grupo11.digitalbooking.digitalbookingrentalcars.service.interfaces.ProductService;
import com.grupo11.digitalbooking.digitalbookingrentalcars.util.FilteredProduct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProductController {

    @Autowired
    private ProductService productService;


    //Ticket Nº 21
    @GetMapping("/bringAll")
    public ResponseEntity<Object> searchAllProducts(){
        return ResponseHandler.generateResponse("List of all products", HttpStatus.OK, productService.listProduct());
    }


    @PostMapping("/addProduct")
    public ResponseEntity<Object> addProduct(@RequestBody ProductDTO productDTO){
        Product product = new Product();
        product.setId(productDTO.getId());
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setCarryOn(productDTO.getCarryOn());
        product.setSuitcase(productDTO.getSuitcase());
        product.setCity(productDTO.getCity());
        product.setCategory(productDTO.getCategory());
        product.setFeatures(productDTO.getFeatures());
        return ResponseHandler.generateResponse("The product has been added successfully", HttpStatus.OK, productService.addProduct(product));
    }


    //Tickets Nº 15, 16 y 17
    @GetMapping("/searchProductById/{id}")
    public ResponseEntity<Object> searchProduct(@PathVariable Integer id){
        ResponseEntity<Object> response=null;

        if (id != null && productService.searchProduct(id).isPresent())
            response = ResponseHandler.generateResponse("Product found", HttpStatus.OK, productService.searchProduct(id));
        else
            response = ResponseHandler.generateResponse("Product not found",HttpStatus.NOT_FOUND,null);

        return response;
    }


    @PutMapping("/updateProduct")
    public ResponseEntity<Object> updateProduct(@RequestBody ProductDTO productDTO){
        ResponseEntity<Object> response=null;

        if (productDTO.getId() != null && productService.searchProduct(productDTO.getId()).isPresent()) {
            Product product = new Product();
            product.setId(productDTO.getId());
            product.setName(productDTO.getName());
            product.setDescription(productDTO.getDescription());
            product.setCarryOn(productDTO.getCarryOn());
            product.setSuitcase(productDTO.getSuitcase());
            product.setCity(productDTO.getCity());
            product.setCategory(productDTO.getCategory());
            product.setFeatures(productDTO.getFeatures());
            response = ResponseHandler.generateResponse("The product has been successfully updated", HttpStatus.OK, productService.updateProduct(product));
        }
        else
            response = ResponseHandler.generateResponse("Product not found",HttpStatus.NOT_FOUND,null);

        return response;

    }


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


    @GetMapping("/category/{id}")
    public ResponseEntity<Object> searchByCategory(@PathVariable Integer id){
        return ResponseHandler.generateResponse("List of Products with the searched category",HttpStatus.OK,productService.searchByCategory(id));
    }


    //Ticket Nº 34
    @GetMapping("/city/{id}")
    public ResponseEntity<Object> searchByCity(@PathVariable Integer id){
        return ResponseHandler.generateResponse("List of Products with the city searched",HttpStatus.OK,productService.searchByCity(id));
    }

    //Ticket Nº 55
    @GetMapping("/product/{cityId}/{initialDate}/{finalDate}")
    public ResponseEntity<Object> searchByCityAndDates(@PathVariable Integer cityId, @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate initialDate, @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate finalDate) throws BadRequestException {
        FilteredProduct filter = new FilteredProduct();
        filter.setInitialDate(initialDate);
        filter.setFinalDate(finalDate);
        filter.setCityId(cityId);
        List<Product> filteredProducts = productService.getProductsByCityAndDate(filter);
        return ResponseHandler.generateResponse("List of Products with the city and dates sought",HttpStatus.OK,filteredProducts);
    }

    //Ticket Nº 32
    @GetMapping("/random")
    public ResponseEntity<Object> randomProducts(){
        return ResponseHandler.generateResponse("Random list of products", HttpStatus.OK, productService.randomProducts());
    }
}
