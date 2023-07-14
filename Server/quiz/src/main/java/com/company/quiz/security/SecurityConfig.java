package com.company.quiz.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationEntryPoint point;
    @Autowired
    private JwtAuthenticationFilter filter;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Bean
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception{
        http.csrf(csrf -> csrf.disable())
                .cors(c->c.disable())
                .authorizeRequests(a->{
                    a
                            .requestMatchers("/auth/**")
                            .permitAll()
                            .requestMatchers(HttpMethod.GET,"/category/delete/**")
                            .hasRole("ADMIN")
                            .requestMatchers(HttpMethod.PUT,"/category/update/**")
                            .hasRole("ADMIN")
                            .requestMatchers(HttpMethod.POST,"/category/create/**")
                            .hasRole("ADMIN")
                            .requestMatchers(HttpMethod.GET,"/question/all/**")
                            .hasRole("ADMIN")
                            .requestMatchers(HttpMethod.POST,"/question/create")
                            .hasRole("ADMIN")
                            .requestMatchers(HttpMethod.DELETE,"/question/delete/**")
                            .hasRole("ADMIN");
                });

                http.exceptionHandling(ex -> ex.authenticationEntryPoint(point))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        http.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    DaoAuthenticationProvider daoAuthenticationProvider(){
        DaoAuthenticationProvider provide = new DaoAuthenticationProvider();
        provide.setUserDetailsService(userDetailsService);
        provide.setPasswordEncoder(passwordEncoder);
        return provide;
    }

}
