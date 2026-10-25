package com.study.ecommerce.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.study.ecommerce.dtos.OrderResponse;
import com.study.ecommerce.entities.User;
import com.study.ecommerce.services.RazorpayService;

@RestController
@RequestMapping("/payment")
public class PaymentController {
	
	@Autowired
	private RazorpayService razorpayService;
	
	@PostMapping("/create-order")
	public ResponseEntity<OrderResponse> createOrder(@AuthenticationPrincipal User user)
	{
		OrderResponse response = razorpayService.createOrder(user.getId());
		return ResponseEntity.ok(response);
	}
	
	

}
