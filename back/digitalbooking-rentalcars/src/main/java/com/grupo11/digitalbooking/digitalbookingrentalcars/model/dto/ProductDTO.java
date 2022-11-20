package com.grupo11.digitalbooking.digitalbookingrentalcars.model.dto;

import com.grupo11.digitalbooking.digitalbookingrentalcars.model.Category;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.City;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.ProductFeature;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class ProductDTO {

    private Integer id;
    private String name;
    private String description;
    private Integer carryOn;
    private Integer suitcase;
    private City city;
    private Category category;
    private List<ProductFeature> features = new ArrayList<>();

}
