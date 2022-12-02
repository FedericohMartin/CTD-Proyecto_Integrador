package com.grupo11.digitalbooking.digitalbookingrentalcars.controller;

import com.grupo11.digitalbooking.digitalbookingrentalcars.handler.ResponseHandler;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.UserModel;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.dto.UserDTO;
import com.grupo11.digitalbooking.digitalbookingrentalcars.service.interfaces.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Api(tags = "Users")
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    //Ticket Nº 49 (Crear endpoint que nos permita registrar nuevos usuarios, utilizando un encoder para encriptar la contraseña).
    @ApiOperation(value="addUser", notes="Agregar un nuevo usuario")
    @PostMapping("/addUser")
    public ResponseEntity<Object> addUser(@RequestBody UserDTO userDTO){
        UserModel model = userService.addUser(userDTO);
        model.setPassword(null);
        return ResponseHandler.generateResponse("The User has been generated successfully",
                HttpStatus.CREATED, model);//Ticket Nº 49 (Retornar un código 201 en caso de éxito. Esto lo hace el CREATED))
    }

    @ApiOperation(value="listAll", notes="Listar todos los usuarios")
    @GetMapping("/listAll")
    public ResponseEntity<Object> listAll(){
        return ResponseHandler.generateResponse("User List", HttpStatus.OK, userService.listUsers());
    }

    @ApiOperation(value = "deleteUser", notes = "Eliminar un usuario por su ID")
    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<Object> deleteUser(@PathVariable Integer id) throws Exception{
        userService.deleteUser(id);
        return ResponseEntity.ok("User was deleted successfully");
    }

    @ApiOperation(value = "updateUser", notes = "Actualizar un usuario")
    @PutMapping("/updateUser")
    public ResponseEntity<Object> updateUser(@RequestBody UserDTO userDTO){
        ResponseEntity<Object> response=null;
        if (userDTO.getId()!=null && userService.searchUser(userDTO.getId()).isPresent())
            response= ResponseHandler.generateResponse("The user has been successfully updated", HttpStatus.OK, userService.updateUser(userDTO));
        else
            response= ResponseHandler.generateResponse("The user has NOT been found", HttpStatus.NOT_FOUND, null);
        return response;
    }

    @ApiOperation(value="searchUser", notes="Buscar un usuario por su ID")
    @GetMapping("/{id}")
    public ResponseEntity<Object> searchUser(@PathVariable Integer id){
        UserModel userModel= userService.searchUser(id).orElse(null);
        return ResponseHandler.generateResponse("The user was found", HttpStatus.OK, userModel);
    }

}
