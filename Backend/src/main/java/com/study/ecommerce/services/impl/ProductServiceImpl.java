package com.study.ecommerce.services.impl;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.study.ecommerce.dtos.ProductDto;
import com.study.ecommerce.entities.Product;
import com.study.ecommerce.repositories.ProductRepository;
import com.study.ecommerce.services.ProductService;

@Service
public class ProductServiceImpl implements ProductService {
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private ProductRepository productRepository;
	

	@Override
	public ProductDto addProduct(ProductDto productDto) {
		
		// dto to entity
		Product product = modelMapper.map(productDto, Product.class);
		
//		save object to database
		Product savedProduct = productRepository.save(product);
		
//		entity to dto
		ProductDto savedDto = modelMapper.map(savedProduct, ProductDto.class);
		
		return savedDto;
	}

//	@Override
//	public List<ProductDto> getProducts() {
//		
////		to fetch products from product table
//		List<Product> products = productRepository.findAll();
//		
//		List<ProductDto> dtoList = products
//		.stream()
//		.map(p->modelMapper.map(p, ProductDto.class))
//		.toList();
//		
//		return dtoList;
//	}
	
	

	@Override
	public Page<ProductDto> getProducts(int page,int size) {
		
//		to fetch products from product table
		Page<Product> products = productRepository.findAll(PageRequest.of(page, size));
		
		Page<ProductDto>  dtoList= products.map(p->modelMapper.map(p, ProductDto.class));
		
		return dtoList;
	}

	@Override
	public ProductDto getProductById(Integer id) {
		
        //search product by id	
		Product product = productRepository.findById(id)
		.orElseThrow(()->new RuntimeException("Product with given id not found"));
		
//		entity to dto
		ProductDto productDto = modelMapper.map(product,ProductDto.class);
		
		return productDto;
	}

	@Override
	public void deleteProduct(Integer id) {
	
		Product product = productRepository.findById(id)
				.orElseThrow(()->new RuntimeException("Product with given id not found"));
		
		productRepository.delete(product);
			
	}

	@Override
	public ProductDto updateProduct(Integer id, ProductDto productDto) {
		
		Product product = productRepository.findById(id)
				.orElseThrow(()->new RuntimeException("Product with given id not found"));
		
		product.setName(productDto.getName());
		product.setPrice(productDto.getPrice());
		product.setDescription(productDto.getDescription());
		product.setImageUrl(productDto.getImageUrl());
		
		Product savedProduct = productRepository.save(product);
		
		ProductDto savedDto = modelMapper.map(savedProduct, ProductDto.class);
		
		return savedDto;
	}

}
