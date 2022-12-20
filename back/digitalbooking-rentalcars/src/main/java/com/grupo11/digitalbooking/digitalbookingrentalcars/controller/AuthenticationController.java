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
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationDTORequest.getEmail(), authenticationDTORequest.getPassword()));
        }catch (BadCredentialsException e) {
            throw new Exception("Incorrect", e);
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationDTORequest.getEmail());
        final String jwt = jwtService.generateToken(userDetails);
        final Integer id = user.userId(authenticationDTORequest.getEmail());
        final String name = user.userName(authenticationDTORequest.getEmail());
        final String surname = user.userSurname(authenticationDTORequest.getEmail());
        final String userCity = user.userCity(authenticationDTORequest.getEmail());
        final String email = user.userEmail(authenticationDTORequest.getEmail());
        final String role = user.userRole(authenticationDTORequest.getEmail());
        return ResponseEntity.ok(new AuthenticationDTOResponse((jwt), id, name, surname, userCity, email, role));
    }
}

