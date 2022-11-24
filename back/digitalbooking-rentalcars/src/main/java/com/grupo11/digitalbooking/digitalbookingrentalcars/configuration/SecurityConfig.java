package com.grupo11.digitalbooking.digitalbookingrentalcars.configuration;

import com.grupo11.digitalbooking.digitalbookingrentalcars.configuration.jwt.JwtEntryPointConfig;
import com.grupo11.digitalbooking.digitalbookingrentalcars.configuration.jwt.JwtTokenFilterConfig;
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
    public JwtTokenFilterConfig jwtTokenFilter() {
        return new JwtTokenFilterConfig();
    }
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        //http.authorizeRequests().anyRequest().permitAll();
        //http.cors().and().csrf().disable();


        http.csrf().disable()
                .authorizeRequests()
                .antMatchers(HttpMethod.POST, "/auth/**", "/api/v1/user/**").permitAll()
                .antMatchers(HttpMethod.GET, "/api/v1/city/**").permitAll()


                .antMatchers(HttpMethod.POST, "/api/v1/city/").hasAnyRole("ADMIN")
                .antMatchers(HttpMethod.POST, "/api/v1/city/country").hasAnyRole("USER")
//                .antMatchers(HttpMethod.PUT, "/api/v1/product/**", "/api/v1/category/**"
//                        , "/api/v1/city/**", "/api/v1/feature/**", "/api/v1/policy/**", "/api/v1/product-feature/**"
//                        , "/api/v1/role/**", "/api/v1/user/**").hasAnyRole("ADMIN")
//                .antMatchers(HttpMethod.DELETE, "/api/v1/product/**", "/api/v1/category/**"
//                        , "/api/v1/city/**", "/api/v1/feature/**", "/api/v1/policy/**", "/api/v1/product-feature/**"
//                        , "/api/v1/role/**", "/api/v1/user/**").hasAnyRole("ADMIN")
//                .antMatchers(HttpMethod.GET, "/api/v1/role/**", "/api/v1/user/**").hasAnyRole("ADMIN")
//                .antMatchers(HttpMethod.POST, "/api/v1/booking/**", "/api/v1/favorite/**").hasAnyRole("USER", "ADMIN")
//                .antMatchers(HttpMethod.PUT, "/api/v1/booking/**", "/api/v1/favorite/**").hasAnyRole("USER", "ADMIN")
//                .antMatchers(HttpMethod.DELETE, "/api/v1/booking/**", "/api/v1/favorite/**").hasAnyRole("USER", "ADMIN")
//                .antMatchers(HttpMethod.GET, "/api/v1/booking/**", "/api/v1/favorite/**").hasAnyRole("USER", "ADMIN")

                //.anyRequest().authenticated()
                .and()
                .exceptionHandling().authenticationEntryPoint(jwtEntryPointConfig)
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.addFilterBefore(jwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
        return http;
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
