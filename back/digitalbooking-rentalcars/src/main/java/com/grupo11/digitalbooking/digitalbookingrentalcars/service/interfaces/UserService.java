package com.grupo11.digitalbooking.digitalbookingrentalcars.service.interfaces;

import com.grupo11.digitalbooking.digitalbookingrentalcars.model.UserModel;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.dto.UserDTO;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;
import java.util.Optional;

public interface UserService {

    UserModel addUser(UserDTO userDTO);

    Optional<UserModel> searchUser(Integer id);

    UserModel updateUser(UserDTO userDTO);

    void deleteUser(Integer id) throws Exception;

    List<UserModel> listUsers();

}