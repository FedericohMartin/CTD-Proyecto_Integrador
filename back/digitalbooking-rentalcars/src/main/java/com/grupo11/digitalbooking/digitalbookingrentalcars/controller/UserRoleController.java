package com.grupo11.digitalbooking.digitalbookingrentalcars.controller;

import com.grupo11.digitalbooking.digitalbookingrentalcars.handler.ResponseHandler;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.UserRole;
import com.grupo11.digitalbooking.digitalbookingrentalcars.service.interfaces.UserRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController

@RequestMapping("/roles")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserRoleController {
    @Autowired
    private UserRoleService userRoleService;


    @PostMapping("/addRole")
    public ResponseEntity<Object> addRole(@RequestBody UserRole userRole){
        return ResponseHandler.generateResponse("Role added successfully", HttpStatus.OK,userRoleService.addRole(userRole));
    }


    @GetMapping("/searchRole/{id}")
    public ResponseEntity<Object> searchRole (@PathVariable Integer id){
        UserRole userRole= userRoleService.searchRole(id).orElse(null);
        return ResponseHandler.generateResponse("The role was found", HttpStatus.OK, userRole);
    }


    @PutMapping("/updateRole")
    public ResponseEntity<Object> updateRole(@RequestBody UserRole userRole){
        ResponseEntity<Object> response;
        if (userRole.getId()!=null && userRoleService.searchRole(userRole.getId()).isPresent())
            response= ResponseHandler.generateResponse("Role updated successfully", HttpStatus.OK,userRoleService.updateRole(userRole));
        else
            response= ResponseHandler.generateResponse("Role NOT found", HttpStatus.NOT_FOUND,null);
        return response;
    }


    @DeleteMapping("/deleteRole/{id}")
    public ResponseEntity<Object> deleteRole(@PathVariable Integer id) throws Exception {

        userRoleService.deleteRole(id);

        return ResponseHandler.generateResponse("Role was deleted successfully", HttpStatus.OK, null);

    }


    @GetMapping("/listRoles")
    public ResponseEntity<Object> listRoles(){
        return ResponseHandler.generateResponse("List of Roles", HttpStatus.OK, userRoleService.listRoles());
    }
}
