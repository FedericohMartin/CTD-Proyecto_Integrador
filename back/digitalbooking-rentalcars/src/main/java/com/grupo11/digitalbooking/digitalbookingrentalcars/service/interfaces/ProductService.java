package com.grupo11.digitalbooking.digitalbookingrentalcars.service.interfaces;

import com.grupo11.digitalbooking.digitalbookingrentalcars.exceptions.BadRequestException;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.Product;
import com.grupo11.digitalbooking.digitalbookingrentalcars.util.FilteredProduct;
import java.util.List;
import java.util.Optional;

public interface ProductService {

    Product addProduct(Product product);

    Optional<Product> searchProduct(Integer id);

    Product updateProduct(Product product);

    void deleteProduct(Integer id) throws Exception;

    List<Product> listProduct();

    List<Product> getProductsByCityAndDate(FilteredProduct filter) throws BadRequestException;

    List<Product> searchByCategory(Integer id);

    List<Product> searchByCity(Integer id);
}
