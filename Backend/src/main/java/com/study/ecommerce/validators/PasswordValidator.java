package com.study.ecommerce.validators;

import com.study.ecommerce.dtos.UserDto;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PasswordValidator implements ConstraintValidator<PasswordMatch, UserDto> {

	@Override
	public boolean isValid(UserDto userDto, ConstraintValidatorContext context) {
		// TODO Auto-generated method stub
		return userDto.getPassword().equals(userDto.getConfirmPassword());
	}
	
	

}
