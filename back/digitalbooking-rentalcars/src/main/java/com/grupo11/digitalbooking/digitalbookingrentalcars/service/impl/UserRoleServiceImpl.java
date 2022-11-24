package com.grupo11.digitalbooking.digitalbookingrentalcars.service.impl;


import com.grupo11.digitalbooking.digitalbookingrentalcars.model.UserRole;
import com.grupo11.digitalbooking.digitalbookingrentalcars.repository.UserRoleRepository;
import com.grupo11.digitalbooking.digitalbookingrentalcars.service.interfaces.UserRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserRoleServiceImpl implements UserRoleService {
    private final UserRoleRepository userRoleRepository;
    //agregar logger


    @Autowired
    public UserRoleServiceImpl(UserRoleRepository userRoleRepository) {
        this.userRoleRepository = userRoleRepository;
    }

    //Agregar rol
    public UserRole addRole(UserRole rolUsuario){
        return userRoleRepository.save(rolUsuario);
    }

    //Buscar rol
    public Optional<UserRole> searchRole(Integer id){
        return userRoleRepository.findById(id);
    }

    //actualizar rol
    public UserRole updateRole(UserRole rolUsuario){
        return userRoleRepository.save(rolUsuario);
    }

    //eliminar rol
    public void deleteRole (Integer id) throws Exception {
        Optional<UserRole> searchedRole = searchRole(id);
        if (searchedRole.isPresent())
            userRoleRepository.deleteById(id);
        else
            throw new Exception("Rol no encontrado");
    }

    //traer todos los roles
    public List<UserRole> listRoles(){

        List<UserRole> roles= userRoleRepository.findAll();

        return roles;
    }

}