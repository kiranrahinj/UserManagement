package com.UserManagement.Config;

import com.UserManagement.Service.UsersDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Autowired
    private UsersDetailsService usersDetailsService;
    @Autowired
    private JWTAuthFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Disable CSRF for stateless applications
                .cors(Customizer.withDefaults()) // Use default CORS configuration
                .authorizeHttpRequests(request -> request
                        .requestMatchers("/auth/**", "/public/**").permitAll() // Publicly accessible endpoints
                        .requestMatchers("/admin/**").hasAnyAuthority("ADMIN") // Only accessible to ADMIN
                        .requestMatchers("/user/**").hasAnyAuthority("USER") // Only accessible to USER
                        .requestMatchers("/adminUser/**").hasAnyAuthority("USER", "ADMIN") // Accessible to both USER and ADMIN
                        .anyRequest().authenticated()) // All other requests must be authenticated
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Stateless session management
                .authenticationProvider(authenticationProvider()) // Set custom authentication provider
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class); // Add JWT filter before the default username/password authentication

        return http.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider authenticationProvider=new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(usersDetailsService);
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

}
