package com.study.ecommerce.services;

import com.study.ecommerce.dtos.OrderResponse;
import com.study.ecommerce.dtos.VerificationRequest;

public interface RazorpayService {
	
  OrderResponse	createOrder(String userId);
  
  boolean verifyPayment(VerificationRequest verificationRequest);
  

}
