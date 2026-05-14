package com.smartmall.controller;

import com.smartmall.dto.OrderDTO;
import com.smartmall.entity.Order;
import com.smartmall.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

	@PatchMapping("/{id}/status")
	public ResponseEntity<Order> updateStatus(@PathVariable Long id, @RequestParam String status) {
		return ResponseEntity.ok(orderService.updateStatus(id, status));
	}
}
