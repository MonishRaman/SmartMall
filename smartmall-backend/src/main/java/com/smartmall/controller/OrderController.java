package com.smartmall.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.smartmall.dto.OrderDTO;
import com.smartmall.entity.Order;
import com.smartmall.service.OrderService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

	private final OrderService orderService;

	public OrderController(OrderService orderService) {
		this.orderService = orderService;
	}

	@PostMapping
	public ResponseEntity<Order> create(@RequestBody OrderDTO orderDTO) {
		return ResponseEntity.status(HttpStatus.CREATED).body(orderService.create(orderDTO));
	}

	@GetMapping
	public ResponseEntity<List<Order>> getAll(@RequestParam(required = false) Long userId) {
		if (userId != null) {
			return ResponseEntity.ok(orderService.getByUserId(userId));
		}
		return ResponseEntity.ok(orderService.getAll());
	}

	@GetMapping("/{id}")
	public ResponseEntity<Order> getById(@PathVariable Long id) {
		return ResponseEntity.ok(orderService.getById(id));
	}

	@GetMapping("/shop/{shopId}")
	public ResponseEntity<List<Order>> getByShopId(@PathVariable Long shopId) {
		return ResponseEntity.ok(orderService.getByShopId(shopId));
	}

	@PatchMapping("/{id}/status")
	public ResponseEntity<Order> updateStatus(@PathVariable Long id, @RequestParam String status) {
		return ResponseEntity.ok(orderService.updateStatus(id, status));
	}
}
