package com.study.ecommerce.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.study.ecommerce.dtos.ApiResponse;
import com.study.ecommerce.dtos.ProductDto;
import com.study.ecommerce.services.CategoryService;

@RestController
@RequestMapping("/categories")
@CrossOrigin(origins = "http://localhost:5173")
public class CategoryController {
	
	@Autowired
	private CategoryService categoryService;
	
//	====================================================================
//	PUT localhost:8080/categories/{categoryId}/products/{productId}
//	localhost:8080/categories/1/products/5
//	====================================================================
	
	@PutMapping("/{categoryId}/products/{productId}")
	public ResponseEntity<ApiResponse> assignCategory(@PathVariable Integer categoryId,
	                                        @PathVariable Integer productId)
	{
		categoryService.addProductToCategory(categoryId, productId);
		
		ApiResponse apiResponse = new ApiResponse("Category assigned successfully");
		
		return ResponseEntity.ok(apiResponse);
	}
	
//================================================
//	GET localhost:8080/categories/{categoryId}/products
//	GET localhost:8080/categories/3/products
//================================================
	@GetMapping("/{categoryId}/products")
	public ResponseEntity<List<ProductDto>> getProductByCategory(@PathVariable Integer categoryId )
	{
		List<ProductDto> products = categoryService.getProductsByCategory(categoryId);
		return ResponseEntity.ok(products);
	}
	
	
	

}
