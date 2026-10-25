package com.study.ecommerce.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.study.ecommerce.dtos.UserDto;
import com.study.ecommerce.dtos.UserResponseDto;
import com.study.ecommerce.services.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	
	
//	===============================================================
//	POST localhost:8080/users
//	===============================================================
	
	@PostMapping
	public ResponseEntity<UserResponseDto> registerUser(@Valid @RequestBody UserDto userDto)
	{
	    UserResponseDto responseDto = userService.register(userDto);
		return new ResponseEntity<UserResponseDto>(responseDto,HttpStatus.CREATED);
	}

}
