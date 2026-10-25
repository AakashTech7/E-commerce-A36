package com.study.ecommerce.services.impl;

import java.util.UUID;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.study.ecommerce.dtos.OrderResponse;
import com.study.ecommerce.dtos.VerificationRequest;
import com.study.ecommerce.entities.Cart;
import com.study.ecommerce.entities.CartItem;
import com.study.ecommerce.services.CartService;
import com.study.ecommerce.services.RazorpayService;

@Service
public class RazorpayServiceImpl implements RazorpayService{
	
	@Value("${razorpay.key}")
	private String razorpayKey;
	
	
	@Value("${razorpay.secret}")
	private String razorpaySecret;
	
	@Autowired
	private CartService cartService;

	@Override
	public OrderResponse createOrder(String userId) {
		
		OrderResponse orderResponse=null;
		
		Cart cart = cartService.getCart(userId);
		
		int total=0;
		
		for(CartItem cartItem :cart.getCartItems())
		{
			total+=cartItem.getQuantity()*cartItem.getProduct().getPrice();
		}
		
		try {
			
			RazorpayClient client = new RazorpayClient(razorpayKey,razorpaySecret);
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("amount", total*100);
			jsonObject.put("currency", "INR");
			jsonObject.put("receipt", 
					"receipt_"+UUID.randomUUID().toString().substring(0, 6));
			
			Order order = client.orders.create(jsonObject);
			orderResponse=new OrderResponse();
			
			orderResponse.setId(order.get("id"));
			orderResponse.setAmount(order.get("amount"));
			orderResponse.setCurrency(order.get("currency"));
			orderResponse.setReceipt(order.get("receipt"));
			orderResponse.setStatus(order.get("status"));
			
			
			
			
		} catch (RazorpayException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return orderResponse;
	}

	@Override
	public boolean verifyPayment(VerificationRequest verificationRequest) {
		// TODO Auto-generated method stub
		return false;
	}

}
