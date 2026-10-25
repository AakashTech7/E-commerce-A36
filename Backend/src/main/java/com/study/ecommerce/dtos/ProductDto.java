package com.study.ecommerce.dtos;

import com.study.ecommerce.entities.Category;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDto {
	
	private Integer id;
	
	@NotNull
	@NotBlank
	private String name; 
	
	@NotNull
	@NotBlank
	private String description;
	
	@Min(1)
	private Integer price;
	
	@NotNull
	@NotBlank
	private String imageUrl;
	private Category category;

}
