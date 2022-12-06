package com.grupo11.digitalbooking.digitalbookingrentalcars.service.interfaces;

import com.grupo11.digitalbooking.digitalbookingrentalcars.model.UserRole;

import java.util.List;
import java.util.Optional;

public interface UserRoleService {

    UserRole addRole(UserRole userRole);

    Optional<UserRole> searchRole(Integer id);

    UserRole updateRole(UserRole userRole);

    void deleteRole (Integer id) throws Exception;

    List<UserRole> listRoles();

}
