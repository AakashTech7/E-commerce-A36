package com.study.ecommerce.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.study.ecommerce.entities.User;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, String>{
	
	 @Query("SELECT u FROM User u WHERE u.email = :email")
	 Optional<User> findByEmail(String email);

}
