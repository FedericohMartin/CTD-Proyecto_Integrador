package com.grupo11.digitalbooking.digitalbookingrentalcars.service.interfaces;

import com.grupo11.digitalbooking.digitalbookingrentalcars.exceptions.BadRequestException;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.Product;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.dto.ProductList;
import com.grupo11.digitalbooking.digitalbookingrentalcars.util.FilteredProduct;
import java.util.List;
import java.util.Optional;

public interface ProductService {

    Product addProduct(Product product);

    Optional<Product> searchProduct(Integer id);

    Product updateProduct(Product product);

    void deleteProduct(Integer id) throws Exception;

    ProductList listProduct();

    List<Product> getProductsByCityAndDate(FilteredProduct filter) throws BadRequestException;

    ProductList searchByCategory(Integer id);

    ProductList searchByCity(Integer id);

    List<Product> randomProducts();
}
