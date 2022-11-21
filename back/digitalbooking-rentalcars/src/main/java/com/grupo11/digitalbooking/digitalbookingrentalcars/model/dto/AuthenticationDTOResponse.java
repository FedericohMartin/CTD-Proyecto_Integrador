package com.grupo11.digitalbooking.digitalbookingrentalcars.model.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthenticationDTOResponse {

    String jwt;
    Integer id;
    String name;
    String surname;
    String userCity;
    String userEmail;
    String role;

}
