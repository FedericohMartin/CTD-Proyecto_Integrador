package com.grupo11.digitalbooking.digitalbookingrentalcars.controller;

import com.grupo11.digitalbooking.digitalbookingrentalcars.handler.ResponseHandler;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.UserRole;
import com.grupo11.digitalbooking.digitalbookingrentalcars.service.interfaces.UserRoleService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Api(tags = "Roles")
@RequestMapping("/roles")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserRoleController {
    @Autowired
    private UserRoleService userRoleService;


    @ApiOperation(value="addRole", notes="Agregar un nuevo rol")
    @PostMapping("/addRole")
    public ResponseEntity<Object> addRole(@RequestBody UserRole userRole){
        return ResponseHandler.generateResponse("Role added successfully", HttpStatus.OK,userRoleService.addRole(userRole));
    }


    @ApiOperation(value="searchRole", notes="Buscar un rol por su ID")
    @GetMapping("/searchRole/{id}")
    public ResponseEntity<Object> searchRole(@PathVariable Integer id){
        UserRole userRole= userRoleService.searchRole(id).orElse(null);
        return ResponseHandler.generateResponse("The role was found", HttpStatus.OK, userRole);
    }


    @ApiOperation(value = "updateRole", notes = "Actualizar un rol")
    @PutMapping("/updateRole")
    public ResponseEntity<Object> updateRole(@RequestBody UserRole userRole){
        ResponseEntity<Object> response;
        if (userRole.getId()!=null && userRoleService.searchRole(userRole.getId()).isPresent())
            response= ResponseHandler.generateResponse("Role updated successfully", HttpStatus.OK,userRoleService.updateRole(userRole));
        else
            response= ResponseHandler.generateResponse("Role NOT found", HttpStatus.NOT_FOUND,null);
        return response;
    }


    @ApiOperation(value = "deleteRole", notes = "Eliminar un rol por su ID")
    @DeleteMapping("/deleteRole/{id}")
    public ResponseEntity<Object> deleteRole(@PathVariable Integer id) throws Exception {

        userRoleService.deleteRole(id);

        return ResponseHandler.generateResponse("Role was deleted successfully", HttpStatus.OK, null);

    }


    @ApiOperation(value="listRoles", notes="Listar todos los roles")
    @GetMapping("/listRoles")
    public ResponseEntity<Object> listRoles(){
        return ResponseHandler.generateResponse("List of Roles", HttpStatus.OK, userRoleService.listRoles());
    }
}
