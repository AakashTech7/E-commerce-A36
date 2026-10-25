package com.study.ecommerce.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.study.ecommerce.entities.Address;
import com.study.ecommerce.entities.User;
import com.study.ecommerce.services.AddressService;

@RestController
@RequestMapping("/address")
public class AddressController {
	
	@Autowired
	private AddressService addressService;

	@PostMapping
	public ResponseEntity<Address> addAddress(@AuthenticationPrincipal User user,
			                                   @RequestBody Address address )
	{
		Address savedAddress = addressService.addAddress(address, user.getId());
		
		return new ResponseEntity<Address>(savedAddress,HttpStatus.CREATED);
		
	}
	
	@GetMapping
	public ResponseEntity<List<Address>> getAddresses(@AuthenticationPrincipal User user)
	{
		return ResponseEntity.ok(addressService.getAddresses(user.getId()));
	}
}
