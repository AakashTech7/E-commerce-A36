package com.study.ecommerce.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Address {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String firstName;
	private String lastName;
	private String email;
	private String phoneNo;
	private String address;
	private String city;
	private String state;
	private String pincode;
	private String country;
	@ManyToOne
	@JsonIgnore
	private User user;
	
	@OneToMany(mappedBy = "address")
	@JsonIgnore
	private List<Order> orders;
	
	

}
