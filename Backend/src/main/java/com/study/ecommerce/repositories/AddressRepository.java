package com.study.ecommerce.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.study.ecommerce.entities.Address;

public interface AddressRepository extends JpaRepository<Address, Integer> {
	
	List<Address> findByUserId(String id);

}
