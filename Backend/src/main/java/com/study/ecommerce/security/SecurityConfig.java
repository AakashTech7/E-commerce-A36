package com.study.ecommerce.security;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.study.ecommerce.security.jwt.AuthEntryPointJwt;
import com.study.ecommerce.security.jwt.AuthTokenFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
	@Autowired
	private AuthTokenFilter authTokenFilter;
	
	@Autowired
	private AuthEntryPointJwt authEntryPointJwt;
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity)
	{
		httpSecurity
		.csrf(csrf->csrf.disable())
		.cors(cors->cors.configurationSource(configurationSource()))          //CorsconfiguarationSource
		.authorizeHttpRequests(request->
		     
		request
		     .requestMatchers(HttpMethod.GET,"/products/**","/categories/**").permitAll()
		     .requestMatchers(HttpMethod.POST,"/users","/auth/login").permitAll()
		     .requestMatchers(HttpMethod.POST,"/products","/categories").hasRole("ADMIN") 
		     .requestMatchers(HttpMethod.PUT,"/products/**","/categories/**").hasRole("ADMIN") 
		     .requestMatchers(HttpMethod.DELETE,"/products/**","/categories/**").hasRole("ADMIN") 
		     .anyRequest().authenticated()
		     
		);
		
		httpSecurity.httpBasic(Customizer.withDefaults());
		
		httpSecurity.addFilterBefore
		(authTokenFilter, UsernamePasswordAuthenticationFilter.class);
		
		httpSecurity.exceptionHandling(authentication->
		authentication.authenticationEntryPoint(authEntryPointJwt));
		
		return httpSecurity.build();
	}
	
	@Bean
	public PasswordEncoder passwordEncoder()
	{
		return new BCryptPasswordEncoder();
	}
	
	
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
	{
		return authenticationConfiguration.getAuthenticationManager();
	}
	
	
//	Global CORS
	
	@Bean
	public CorsConfigurationSource configurationSource()
	{
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowedOrigins(List.of("http://localhost:5173"));
		config.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS"));
		config.setAllowedHeaders(List.of("*"));
		config.setAllowCredentials(true);
		
		UrlBasedCorsConfigurationSource source =
				 new UrlBasedCorsConfigurationSource();
		 
		 source.registerCorsConfiguration("/**", config);
		return source;
	}
	
	
	
	
	
       

}
