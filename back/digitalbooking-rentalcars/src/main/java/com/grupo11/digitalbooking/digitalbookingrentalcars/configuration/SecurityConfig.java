package com.grupo11.digitalbooking.digitalbookingrentalcars.configuration;


import com.grupo11.digitalbooking.digitalbookingrentalcars.filter.JwtRequestFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtEntryPointConfig jwtEntryPointConfig;


    @Bean
    public JwtRequestFilter jwtTokenFilter(){
        return new JwtRequestFilter();
    }

    //Ticket Nº 52
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers(HttpMethod.GET,"/products/**","/features/**").permitAll()
                .antMatchers(HttpMethod.POST,"/bookings/**").hasAnyRole("USER","ADMIN")
                .antMatchers(HttpMethod.PUT,"/products/**").hasAnyRole("ADMIN")
                .antMatchers(HttpMethod.DELETE,"/products/**").hasAnyRole("ADMIN")
                .and().exceptionHandling().authenticationEntryPoint(jwtEntryPointConfig)
                .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.addFilterBefore(jwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
                return null;
            }
        };
    }
}
