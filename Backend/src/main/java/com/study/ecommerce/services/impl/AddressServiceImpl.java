package com.study.ecommerce.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.ecommerce.entities.Address;
import com.study.ecommerce.entities.User;
import com.study.ecommerce.repositories.AddressRepository;
import com.study.ecommerce.repositories.UserRepository;
import com.study.ecommerce.services.AddressService;

@Service
public class AddressServiceImpl implements AddressService {
	
	@Autowired
	private AddressRepository addressRepository;
	
	@Autowired
	private UserRepository userRepository;

	@Override
	public Address addAddress(Address address, String userId) {
		
		User user = userRepository.findById(userId)
				.orElseThrow(()->
				new RuntimeException("User with given id not found"));
		
		address.setUser(user);
		
		return addressRepository.save(address);
	}

	@Override
	public List<Address> getAddresses(String userId) {
		
		return addressRepository.findByUserId(userId);
	}
	
	

}
