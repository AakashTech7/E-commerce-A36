package com.study.ecommerce.services.impl;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.ecommerce.dtos.ProductDto;
import com.study.ecommerce.entities.Category;
import com.study.ecommerce.entities.Product;
import com.study.ecommerce.repositories.CategoryRepository;
import com.study.ecommerce.repositories.ProductRepository;
import com.study.ecommerce.services.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService {
	
	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	@Autowired
	private ModelMapper modelMapper;

	@Override
	//      1     5
	public void addProductToCategory(Integer categoryId, Integer productId) {
		
		Product product = productRepository.findById(productId)
		.orElseThrow(()->new RuntimeException("Product with given Id not found"));
		
		Category category = categoryRepository.findById(categoryId)
		.orElseThrow(()->new RuntimeException("Category with given Id not found"));
		
		product.setCategory(category);
		
		productRepository.save(product);
	}

	@Override
	public List<ProductDto> getProductsByCategory(Integer categoryId) {
		
		Category category = categoryRepository.findById(categoryId)
				.orElseThrow(()->new RuntimeException("Category with given Id not found"));
		
		List<Product> products = category.getProducts();
		
		List<ProductDto> dtoList = products
		.stream()
		.map(p->modelMapper.map(p, ProductDto.class))
		.toList();
		
		return dtoList;
	}
	

}
