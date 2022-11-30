package com.grupo11.digitalbooking.digitalbookingrentalcars.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookingDTO {
    private String hour;
    private String initialDate;
    private String finalDate;
    private Integer userId;
    private Integer productId;

}
