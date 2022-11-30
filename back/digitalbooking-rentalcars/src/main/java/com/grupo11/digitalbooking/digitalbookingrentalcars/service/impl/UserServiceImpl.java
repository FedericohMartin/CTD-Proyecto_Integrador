package com.grupo11.digitalbooking.digitalbookingrentalcars.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.UserModel;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.UserRole;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.dto.UserDTO;
import com.grupo11.digitalbooking.digitalbookingrentalcars.repository.UserRoleRepository;
import com.grupo11.digitalbooking.digitalbookingrentalcars.repository.UserRepository;
import com.grupo11.digitalbooking.digitalbookingrentalcars.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final UserRoleRepository userRoleRepository;
    @Autowired
    private final PasswordEncoder passwordEncoder;
    @Autowired
    ObjectMapper mapper;

    public UserServiceImpl(
            UserRepository userRepository,
            UserRoleRepository userRoleRepository,
            PasswordEncoder passwordEncoder) {
                this.userRepository = userRepository;
                this.userRoleRepository = userRoleRepository;
                this.passwordEncoder = passwordEncoder;
    }
    //Ticket Nº 49
    public UserModel addUser(UserDTO userDTO){
        userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));//Ticket Nº 49 (Utilizamos un "encoder" para encriptar la contraseña)
        UserModel userModel = mapper.convertValue(userDTO, UserModel.class);
        return userRepository.save(userModel);
    }

    public UserModel newUser(UserDTO userDTO) {
        return addUser(userDTO);
    }

    //listar todos los usuarios
    public List<UserModel> listUsers(){
        return userRepository.findAll();
    }

    //actualizar usuario
    public UserModel updateUser(UserDTO userDTO){
        UserModel userModel = mapper.convertValue(userDTO, UserModel.class);
        return userRepository.save(userModel);
    }
    //eliminar usuario
    public void deleteUser(Integer id) throws Exception{
        Optional<UserModel> searchedUser = searchUser(id);
        if (searchedUser.isPresent())
            userRepository.deleteById(id);
        else
            throw new Exception("The user with id: "+id+" was not found");
    }

    //buscar usuario
    public Optional<UserModel> searchUser(Integer id){
        return userRepository.findById(id);
    }


    @Override
    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        UserModel userModel = userRepository.findByUsername(username);
        String rol = userModel.getRole().getName();
        System.out.println(rol);
        List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
        authorities.add(new SimpleGrantedAuthority(rol));

        return new User(
                username,
                userModel.getPassword(),
                true,
                true,
                true,
                true,
                authorities);
    }

    public Integer userId(String username){
        UserModel userModel = userRepository.findByUsername(username);
        Integer id = userModel.getId();

        return (id);
    }
    public String userName(String username){
        UserModel userModel = userRepository.findByUsername(username);
        String name = userModel.getName();

        return (name);
    }
    public String userSurname(String username){
        UserModel userModel = userRepository.findByUsername(username);
        String surname = userModel.getSurname();
        //String userCity = userModel.getUserCity();
        return (surname);
    }

    public String userCity(String username){
        UserModel userModel = userRepository.findByUsername(username);
        String userCity = userModel.getUserCity();
        return (userCity);
    }

    public String userEmail(String username){
        UserModel userModel = userRepository.findByUsername(username);
        String email = userModel.getEmail();
        return (email);
    }

    public String userRole(String username){
        UserModel userModel = userRepository.findByUsername(username);
        String role = userModel.getRole().getName();
        return (role);
    }

}