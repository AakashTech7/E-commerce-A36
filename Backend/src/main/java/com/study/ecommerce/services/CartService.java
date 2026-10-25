package com.study.ecommerce.services;

import com.study.ecommerce.entities.Cart;
import com.study.ecommerce.entities.CartItem;

public interface CartService {

	Cart getCart(String userId);
	
	Cart addToCart(String userId,int productId,CartItem cartItem);
	
	void clearCart(String userId);
	
	
}
