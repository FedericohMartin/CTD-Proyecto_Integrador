package com.grupo11.digitalbooking.digitalbookingrentalcars.model.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AuthenticationDTORequest {

    String username;
    String password;
}
