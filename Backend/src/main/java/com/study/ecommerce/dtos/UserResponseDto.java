package com.study.ecommerce.dtos;

import com.study.ecommerce.enums.Role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDto {
	
	private String firstName;
	private String lastName;
	private String email;
	private Role role;
	
}
