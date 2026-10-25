package com.study.ecommerce.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.study.ecommerce.dtos.LoginDto;
import com.study.ecommerce.dtos.LoginResponseDto;
import com.study.ecommerce.dtos.UserDto;
import com.study.ecommerce.dtos.UserResponseDto;
import com.study.ecommerce.entities.User;
import com.study.ecommerce.security.jwt.JwtUtils;

@RestController
@RequestMapping("/auth")

public class AuthController {
	
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	
	@Autowired
	private JwtUtils jwtUtils;
	
	
	@Autowired
	private ModelMapper modelMapper;
	
	
	
//	POST     /auth/login               
	@PostMapping("/login")
	public ResponseEntity<LoginResponseDto> login(@RequestBody LoginDto loginDto)
	{
		String email = loginDto.getEmail();
		String password = loginDto.getPassword();
		
		Authentication authentication=null;
		
		
		try {
			authentication = authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(email, password));
		} catch (BadCredentialsException e) {
			System.out.println("Invalid username or password");
		}
		
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		User user=(User)authentication.getPrincipal();
		
		String token = jwtUtils.generateTokenFromUsername(user);
		
		 UserResponseDto userDto = modelMapper.map(user, UserResponseDto.class);
		
		return ResponseEntity.ok(new LoginResponseDto(userDto, token));
	}

}
