package com.study.ecommerce.services;

import java.util.List;

import com.study.ecommerce.dtos.ProductDto;

public interface CategoryService {
	void addProductToCategory(Integer categoryId,Integer productId);
	
	List<ProductDto> getProductsByCategory(Integer CategoryId);
	
}
