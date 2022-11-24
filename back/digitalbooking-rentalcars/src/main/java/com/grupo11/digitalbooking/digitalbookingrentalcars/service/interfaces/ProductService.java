package com.grupo11.digitalbooking.digitalbookingrentalcars.service.interfaces;

import com.grupo11.digitalbooking.digitalbookingrentalcars.exceptions.BadRequestException;
import com.grupo11.digitalbooking.digitalbookingrentalcars.exceptions.ProductNotFoundException;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.Product;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.dto.ProductDTO;
<<<<<<< HEAD
=======
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.dto.ProductList;
>>>>>>> b259c9a65ccc642016d7ce740431e1f1958046f3
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.dto.ProductUpdateDTO;
import com.grupo11.digitalbooking.digitalbookingrentalcars.util.FilteredProduct;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ProductService {

    Product addProduct(ProductDTO dto);

    Optional<Product> searchProduct(Integer id);

    Product updateProduct(ProductUpdateDTO dto) throws ProductNotFoundException;

    void deleteProduct(Integer id) throws Exception;

    ProductList listProduct();

    ProductList getProductsByCityAndDate(FilteredProduct filter) throws BadRequestException;

    ProductList searchByCategory(Integer id);

    ProductList searchByCity(Integer id);

    ProductList searchByDates(LocalDate initialDate, LocalDate finalDate) throws BadRequestException;

    List<Product> randomProducts();
}
