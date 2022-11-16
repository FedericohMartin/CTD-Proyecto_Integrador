package com.grupo11.digitalbooking.digitalbookingrentalcars.model.dto;

import com.grupo11.digitalbooking.digitalbookingrentalcars.model.Product;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class ProductList {
    private List<Product> items;
    private long total;
}
