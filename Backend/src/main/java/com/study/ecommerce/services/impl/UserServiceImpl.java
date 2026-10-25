package com.study.ecommerce.services.impl;

import org.jspecify.annotations.Nullable;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.study.ecommerce.dtos.UserDto;
import com.study.ecommerce.dtos.UserResponseDto;
import com.study.ecommerce.entities.User;
import com.study.ecommerce.enums.Role;
import com.study.ecommerce.repositories.UserRepository;
import com.study.ecommerce.services.UserService;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	

	@Override
	public UserResponseDto register(UserDto userDto) {
		
//		dto to entity
		User user = modelMapper.map(userDto, User.class);

//		set ROLE_USER role
		user.setRole(Role.ROLE_USER);
		
//		encode password
		String encodedPassword = passwordEncoder.encode(user.getPassword());
		user.setPassword(encodedPassword);
		
//	    save object to database 	
		User savedUser = userRepository.save(user);
		
//		converted entity to UserResponseDto
		UserResponseDto responseDto = modelMapper.map(savedUser, UserResponseDto.class);
		
		return responseDto;
	}

}
