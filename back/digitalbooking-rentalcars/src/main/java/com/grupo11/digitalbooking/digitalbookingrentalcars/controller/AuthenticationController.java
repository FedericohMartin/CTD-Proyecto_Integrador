package com.grupo11.digitalbooking.digitalbookingrentalcars.controller;

import com.grupo11.digitalbooking.digitalbookingrentalcars.model.dto.AuthenticationDTORequest;
import com.grupo11.digitalbooking.digitalbookingrentalcars.model.dto.AuthenticationDTOResponse;
import com.grupo11.digitalbooking.digitalbookingrentalcars.service.impl.UserServiceImpl;
import com.grupo11.digitalbooking.digitalbookingrentalcars.service.interfaces.JwtService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/authenticate")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserServiceImpl user;


    @ApiOperation(value="Autenticación", notes="Autenticación del rol utilizando JWT")
    @PostMapping(value = "")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationDTORequest authenticationDTORequest)
            throws Exception{
        System.out.println(authenticationDTORequest);
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationDTORequest.getUsername(), authenticationDTORequest.getPassword()));
        }catch (BadCredentialsException e) {
            throw new Exception("Incorrect", e);
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationDTORequest.getUsername());
        final String jwt = jwtService.generateToken(userDetails);
        final Integer id = user.userId(authenticationDTORequest.getUsername());
        final String name = user.userName(authenticationDTORequest.getUsername());
        final String surname = user.userSurname(authenticationDTORequest.getUsername());
        final String userCity = user.userCity(authenticationDTORequest.getUsername());
        final String email = user.userEmail(authenticationDTORequest.getUsername());
        final String role = user.userRole(authenticationDTORequest.getUsername());
        return ResponseEntity.ok(new AuthenticationDTOResponse((jwt), id, name, surname, userCity, email, role));
    }
}

