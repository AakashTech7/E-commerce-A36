package com.study.ecommerce.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Product {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(nullable = false,length = 100)
	private String name; 
	
	@Column(nullable = false, length = 200)
	private String description;
	
	@Column(nullable = false)
	private Integer price;
	
	@Column(nullable = false, length = 500)
	private String imageUrl;
	
	@ManyToOne
//	@JsonManagedReference
	private Category category;
	
	@OneToMany(mappedBy = "product")
	@JsonIgnore
	private List<CartItem> cartItems;
	
	@OneToMany(mappedBy = "product")
	private List<OrderItem> orderItems;
	
}
