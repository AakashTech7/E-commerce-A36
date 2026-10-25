package com.study.ecommerce.entities;

import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user_cart")
public class Cart {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@OneToOne
	@JsonIgnore
	private User user;
	
	@CreationTimestamp
	private LocalDateTime createdAt;
	
	@OneToMany(mappedBy = "cart")
	private List<CartItem> cartItems;
	
//	@ManyToMany
//	@JoinTable( name = "cart_products" ,
//				joinColumns = @JoinColumn(name = "cart_id"),
//				inverseJoinColumns = @JoinColumn(name = "product_id"))
//	private List<Product> products;
	
	

}
