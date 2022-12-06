package com.grupo11.digitalbooking.digitalbookingrentalcars.model.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthenticationDTORequest {

    String username;
    String password;
}
