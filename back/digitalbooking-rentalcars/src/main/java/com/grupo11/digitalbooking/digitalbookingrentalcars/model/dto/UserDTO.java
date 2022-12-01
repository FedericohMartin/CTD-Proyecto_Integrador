package com.grupo11.digitalbooking.digitalbookingrentalcars.model.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.UserModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {

    private Integer id;
    private String name;
    private String surname;
    private String email;
    private String password;
    private String userCity;
    private String username;
    private UserRoleDTO role;

}
