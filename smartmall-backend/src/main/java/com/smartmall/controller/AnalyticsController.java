package com.smartmall.controller;

import com.smartmall.repository.OrderRepository;
import com.smartmall.repository.ProductRepository;
import com.smartmall.repository.ShopRepository;
import com.smartmall.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

	private final UserRepository userRepository;
	private final ShopRepository shopRepository;
	private final ProductRepository productRepository;
	private final OrderRepository orderRepository;

	public AnalyticsController(UserRepository userRepository,
							   ShopRepository shopRepository,
							   ProductRepository productRepository,
							   OrderRepository orderRepository) {
		this.userRepository = userRepository;
		this.shopRepository = shopRepository;
		this.productRepository = productRepository;
		this.orderRepository = orderRepository;
	}

	@GetMapping("/overview")
	public ResponseEntity<Map<String, Object>> overview() {
		Map<String, Object> data = new LinkedHashMap<>();
		data.put("users", userRepository.count());
		data.put("shops", shopRepository.count());
		data.put("products", productRepository.count());
		data.put("orders", orderRepository.count());
		return ResponseEntity.ok(data);
	}
}
