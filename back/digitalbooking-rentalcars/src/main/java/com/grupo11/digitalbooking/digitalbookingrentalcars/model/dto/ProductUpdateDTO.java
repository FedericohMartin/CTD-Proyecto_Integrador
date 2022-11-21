package com.grupo11.digitalbooking.digitalbookingrentalcars.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ProductUpdateDTO {

    private Integer id;
    private String name;
    private String description;
    private Integer stock;
    private Integer carryOn;
    private Integer suitcase;
    private Integer cityId;
    private Integer categoryId;
    private List<ImageDTO> images;
    private List<Integer> feature_ids;

}
