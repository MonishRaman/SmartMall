package com.smartmall.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.smartmall.entity.Cart;
import com.smartmall.exception.ResourceNotFoundException;
import com.smartmall.repository.CartRepository;

@RestController
@RequestMapping("/api/carts")
public class CartController {

	private final CartRepository cartRepository;

	public CartController(CartRepository cartRepository) {
		this.cartRepository = cartRepository;
	}

	@PostMapping
	public ResponseEntity<Cart> create(@RequestBody Cart cart) {
		return ResponseEntity.status(HttpStatus.CREATED).body(cartRepository.save(cart));
	}

	@GetMapping
	public ResponseEntity<List<Cart>> getAll(@RequestParam(required = false) Long userId) {
		if (userId != null) {
			return cartRepository.findByUserId(userId)
					.map(cart -> ResponseEntity.ok(List.of(cart)))
					.orElseGet(() -> ResponseEntity.ok(List.of()));
		}
		return ResponseEntity.ok(cartRepository.findAll());
	}

	@GetMapping("/{id}")
	public ResponseEntity<Cart> getById(@PathVariable Long id) {
		Cart cart = cartRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Cart not found: " + id));
		return ResponseEntity.ok(cart);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		cartRepository.deleteById(id);
		return ResponseEntity.noContent().build();
	}
}
