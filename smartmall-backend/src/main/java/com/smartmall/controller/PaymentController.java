package com.smartmall.controller;

import com.smartmall.dto.PaymentDTO;
import com.smartmall.entity.Payment;
import com.smartmall.service.PaymentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

	private final PaymentService paymentService;

	public PaymentController(PaymentService paymentService) {
		this.paymentService = paymentService;
	}

	@PostMapping
	public ResponseEntity<Payment> create(@RequestBody PaymentDTO paymentDTO) {
		return ResponseEntity.status(HttpStatus.CREATED).body(paymentService.create(paymentDTO));
	}

	@GetMapping
	public ResponseEntity<List<Payment>> getAll() {
		return ResponseEntity.ok(paymentService.getAll());
	}

	@GetMapping("/{id}")
	public ResponseEntity<Payment> getById(@PathVariable Long id) {
		return ResponseEntity.ok(paymentService.getById(id));
	}

	@GetMapping("/order/{orderId}")
	public ResponseEntity<Payment> getByOrder(@PathVariable Long orderId) {
		return ResponseEntity.ok(paymentService.getByOrderId(orderId));
	}

	@PatchMapping("/{id}/status")
	public ResponseEntity<Payment> updateStatus(@PathVariable Long id, @RequestParam String status) {
		return ResponseEntity.ok(paymentService.updateStatus(id, status));
	}
}
