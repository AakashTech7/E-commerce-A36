package com.study.ecommerce.services.impl;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.ecommerce.entities.Cart;
import com.study.ecommerce.entities.CartItem;
import com.study.ecommerce.entities.Product;
import com.study.ecommerce.entities.User;
import com.study.ecommerce.repositories.CartItemRepository;
import com.study.ecommerce.repositories.CartRepository;
import com.study.ecommerce.repositories.ProductRepository;
import com.study.ecommerce.repositories.UserRepository;
import com.study.ecommerce.services.CartService;

@Service
public class CartServiceImpl implements CartService{
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private CartRepository cartRepository;
	
	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private CartItemRepository cartItemRepository;

	@Override
	public Cart getCart(String userId) {
		
		User user = userRepository.findById(userId)
		.orElseThrow(()->
		new RuntimeException("User with given id not found"));
		
		Cart cart = user.getCart();
		if(cart==null)
		{
			cart = new Cart();
			cart.setUser(user);
			cart.setCartItems(new ArrayList<CartItem>());
			cart=cartRepository.save(cart);
			
		}
		
		return cart;
	}

	@Override
	public Cart addToCart(String userId, int productId, CartItem cartItem) {
		
		Cart cart = getCart(userId);
		
		Product product = productRepository.findById(productId)
		.orElseThrow(()->new RuntimeException("Product with given id not found"));
		
		
		for(CartItem item:cart.getCartItems())
		{
			if(item.getProduct().getId()==productId)
			{
				item.setQuantity(item.getQuantity()+cartItem.getQuantity());
				cartItemRepository.save(item);
				return getCart(userId);
			}
		}
		
		cartItem.setProduct(product);
		cartItem.setCart(cart);
		
		cartItemRepository.save(cartItem);
		
		
		return getCart(userId);
	}

	@Override
	public void clearCart(String userId) {
		Cart cart = getCart(userId);
		cartItemRepository.deleteAll(cart.getCartItems());
		
	}
	
	

}
