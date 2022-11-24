package com.grupo11.digitalbooking.digitalbookingrentalcars.configuration.jwt;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@Slf4j
@Component
public class JwtEntryPointConfig implements AuthenticationEntryPoint {

    /**
     * Punto de interrupción en la autenticación para validar que la autenticación y token
     * si en los pasos previos hay error, este llegará a este punto a informar un estado
     * 401 de no autorizado
     */
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response
            , AuthenticationException authException) throws IOException, ServletException {
        log.error("Fail method commence");
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
    }
}