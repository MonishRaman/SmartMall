package com.smartmall.controller;

import com.smartmall.dto.DashboardDTO;
import com.smartmall.repository.OrderRepository;
import com.smartmall.repository.PaymentRepository;
import com.smartmall.repository.ProductRepository;
import com.smartmall.repository.ShopRepository;
import com.smartmall.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

	private final UserRepository userRepository;
	private final ShopRepository shopRepository;
	private final ProductRepository productRepository;
	private final OrderRepository orderRepository;
	private final PaymentRepository paymentRepository;

	public DashboardController(UserRepository userRepository,
							   ShopRepository shopRepository,
							   ProductRepository productRepository,
							   OrderRepository orderRepository,
							   PaymentRepository paymentRepository) {
		this.userRepository = userRepository;
		this.shopRepository = shopRepository;
		this.productRepository = productRepository;
		this.orderRepository = orderRepository;
		this.paymentRepository = paymentRepository;
	}

	@GetMapping
	public ResponseEntity<DashboardDTO> getDashboard() {
		DashboardDTO dto = DashboardDTO.builder()
				.users(userRepository.count())
				.shops(shopRepository.count())
				.products(productRepository.count())
				.orders(orderRepository.count())
				.payments(paymentRepository.count())
				.build();
		return ResponseEntity.ok(dto);
	}
}
