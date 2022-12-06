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

    private String name;
    private String description;
    private Integer stock;
    private Integer carryOn;
    private Integer suitcase;
    private Integer cityId;
    private Integer categoryId;
    private List<String> images;
    private List<Integer> feature_ids;

}
