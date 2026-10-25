package com.study.ecommerce.services;

import java.util.List;

import org.springframework.data.domain.Page;

import com.study.ecommerce.dtos.ProductDto;

public interface ProductService {

//	To add Product
 ProductDto	addProduct(ProductDto productDto);
 
// To fetch all Products
// List<ProductDto> getProducts(); OLD
 Page<ProductDto> getProducts(int page,int size); // NEW
 
// get Product by id
 ProductDto getProductById(Integer id);
 
// delete Product
 void deleteProduct(Integer id);
 
// update product
ProductDto updateProduct(Integer id,ProductDto productDto);
 
 
 

 
 
}
