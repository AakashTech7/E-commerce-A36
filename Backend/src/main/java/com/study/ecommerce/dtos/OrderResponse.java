package com.study.ecommerce.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderResponse {

	private String id;
	private Integer amount;
	private String status;
	private String currency;
	private String receipt;
	
}
