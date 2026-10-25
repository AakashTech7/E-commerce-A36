package com.study.ecommerce.dtos;

import com.study.ecommerce.validators.PasswordMatch;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@PasswordMatch
public class UserDto {
	
	private String id;
	
	@NotNull
	@NotBlank
	@Size(min = 2,max = 100)//  size annotation is used on String
	private String firstName;
	
	@NotNull
	@NotBlank
	private String lastName;
	
	@NotNull
	@NotBlank
	@Pattern(regexp = "^((?!\\.)[\\w\\-_.]*[^.])(@\\w+)(\\.\\w+(\\.\\w+)?[^.\\W])$") //regex101 website
	private String email;
	
	@NotNull
	@NotBlank
	@Pattern(regexp = "^((?=\\S*?[A-Z])(?=\\S*?[a-z])(?=\\S*?[0-9]).{6,})\\S$")
	private String password;
	
	@NotNull(message = "confirm password cannot be null")
	@NotBlank(message = "confirm password cannot be blank")
	private String confirmPassword;
}
