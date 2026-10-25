package com.study.ecommerce.services;

import java.util.List;

import com.study.ecommerce.entities.Address;

public interface AddressService {
	
	Address addAddress(Address address,String userId);
	
	List<Address> getAddresses(String userId);

}
