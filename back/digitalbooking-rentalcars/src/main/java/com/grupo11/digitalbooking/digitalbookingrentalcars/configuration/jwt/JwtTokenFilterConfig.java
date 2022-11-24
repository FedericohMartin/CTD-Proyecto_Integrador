package com.grupo11.digitalbooking.digitalbookingrentalcars.configuration.jwt;

import com.grupo11.digitalbooking.digitalbookingrentalcars.service.impl.UserServiceImpl;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
public class JwtTokenFilterConfig extends OncePerRequestFilter {

    @Autowired
    private JwtProviderConfig jwtProviderConfig;

    @Autowired
    private UserServiceImpl userService;


    /**
     * Metodo que hace un filtrado de las solicitudes para que antes de que llegue al
     * recurso se valide si esta permitido o no el acceso a dicho recurso
     * */
    @SneakyThrows
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String token = myToken(request);
        if (token != null && jwtProviderConfig.validateToken(token)) {
            /**
             * Inicia a revisar si el token tiene los permisos para ingresar a ese recurso
             * que estamos consumiendo, ver que tenga y cuente con los tiempos actualizados
             * de expiración y de integridad.
             * */
            String username = jwtProviderConfig.getUserNameFromToken(token);
            UserDetails userDetails = userService.loadUserByUsername(username);
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        }
        filterChain.doFilter(request, response);
    }

    /**
     * Metodo de apoyo para obtener el token que se esta enviando desde el front
     * Se hace un reemplazo del Bearer por un vacio "", esto para tener solamente el
     * token como tal
     * */
    private String myToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer")) {
            return header.replace("Bearer ", "");
        }
        return null;
    }
}
