package com.study.ecommerce.services;

import com.study.ecommerce.dtos.UserDto;
import com.study.ecommerce.dtos.UserResponseDto;

public interface UserService {
	
  UserResponseDto register(UserDto userDto);

}
