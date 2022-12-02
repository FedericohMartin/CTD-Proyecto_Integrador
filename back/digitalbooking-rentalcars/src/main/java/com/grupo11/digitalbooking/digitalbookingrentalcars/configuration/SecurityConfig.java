package com.grupo11.digitalbooking.digitalbookingrentalcars.configuration;


import com.grupo11.digitalbooking.digitalbookingrentalcars.filter.JwtRequestFilter;
import com.grupo11.digitalbooking.digitalbookingrentalcars.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtEntryPointConfig jwtEntryPointConfig;

    @Autowired
    private UserServiceImpl userService;


    @Bean
    public JwtRequestFilter jwtTokenFilter(){
        return new JwtRequestFilter();
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    //Ticket Nº 52
    //Se configura método de autenticación que nos retorne un  JWT
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable().authorizeRequests()
                .antMatchers("/authenticate").permitAll()
                .antMatchers(HttpMethod.POST,"/users/addUser").permitAll()
                .antMatchers(HttpMethod.GET,"/products/**",
                        "/images/**",
                        "/cities/**",
                        "/bookings/**",
                        "/categories/**",
                        "/features/**").permitAll()
                .antMatchers(HttpMethod.GET,
                        "/users/**",
                        "/roles/**").hasAnyRole("ADMIN")
                .antMatchers(HttpMethod.POST,"/bookings/**").hasAnyRole("USER","ADMIN")
                .antMatchers(HttpMethod.POST,"/products/**",
                        "/categories/**",
                        "/features/**",
                        "/images/**",
                        "/cities/**",
                        "/productsFeatures/**",
                        "/users/**",
                        "/roles/**").hasAnyRole("ADMIN")
                .antMatchers(HttpMethod.PUT,"/products/**",
                        "/bookings/**",
                        "/categories/**",
                        "/features/**",
                        "/images/**",
                        "/cities/**",
                        "/productsFeatures/**",
                        "/users/**",
                        "/roles/**").hasAnyRole("ADMIN")
                .antMatchers(HttpMethod.DELETE,"/products/**",
                        "/bookings/**",
                        "/categories/**",
                        "/features/**",
                        "/productsFeatures/**",
                        "/images/**",
                        "/cities/**",
                        "/users/**",
                        "/roles/**").hasAnyRole("ADMIN")
                .anyRequest().permitAll()
                .and().exceptionHandling().authenticationEntryPoint(jwtEntryPointConfig)
                .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.addFilterBefore(jwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService);

    }

    /*@Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }*/

}
