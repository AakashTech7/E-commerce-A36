package com.study.ecommerce.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VerificationRequest {
	
	private String razorpayOrderId;
	private String razorpayPaymentId;
	private String razorpaySignature;

}
