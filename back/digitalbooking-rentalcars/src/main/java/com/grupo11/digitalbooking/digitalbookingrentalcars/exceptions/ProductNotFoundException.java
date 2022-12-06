package com.grupo11.digitalbooking.digitalbookingrentalcars.exceptions;

public class ProductNotFoundException extends RuntimeException{
    public ProductNotFoundException(Integer productId) {
        super("Product with id="+productId+" not found.");
    }
}
