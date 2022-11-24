package com.grupo11.digitalbooking.digitalbookingrentalcars.controller;

import com.grupo11.digitalbooking.digitalbookingrentalcars.handler.ResponseHandler;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.UserModel;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.dto.UserDTO;
import com.grupo11.digitalbooking.digitalbookingrentalcars.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//Ticket Nº 49
@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/addUser")
    public ResponseEntity<Object> addUser(@RequestBody UserDTO userDTO){
        return ResponseHandler.generateResponse("The User has been generated successfully",
                HttpStatus.CREATED, userService.addUser(userDTO));
    }

    @GetMapping("/listAll")
    public ResponseEntity<Object> listAll(){
        return ResponseHandler.generateResponse("User List", HttpStatus.OK, userService.listUsers());
    }

    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<Object> deleteUser(@PathVariable Integer id) throws Exception{
        userService.deleteUser(id);
        return ResponseEntity.ok("User was deleted successfully");
    }

    @PutMapping("/updateUser")
    public ResponseEntity<Object> updateUser(@RequestBody UserDTO userDTO){
        ResponseEntity<Object> response=null;
        if (userDTO.getId()!=null && userService.searchUser(userDTO.getId()).isPresent())
            response= ResponseHandler.generateResponse("The user has been successfully updated", HttpStatus.OK, userService.updateUser(userDTO));
        else
            response= ResponseHandler.generateResponse("The user has NOT been found", HttpStatus.NOT_FOUND, null);
        return response;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> searchUser(@PathVariable Integer id){
        UserModel userModel= userService.searchUser(id).orElse(null);
        return ResponseHandler.generateResponse("The user was found", HttpStatus.OK, userModel);
    }

}
