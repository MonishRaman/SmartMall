package com.smartmall.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.smartmall.entity.Cart;
import com.smartmall.entity.CartItem;
import com.smartmall.entity.Product;
import com.smartmall.entity.User;
import com.smartmall.exception.ResourceNotFoundException;
import com.smartmall.repository.CartItemRepository;
import com.smartmall.repository.CartRepository;
import com.smartmall.repository.ProductRepository;
import com.smartmall.repository.UserRepository;

@RestController
@RequestMapping("/api/carts")
public class CartController {

	private final CartRepository cartRepository;
	private final CartItemRepository cartItemRepository;
	private final UserRepository userRepository;
	private final ProductRepository productRepository;

	public CartController(CartRepository cartRepository,
					  CartItemRepository cartItemRepository,
					  UserRepository userRepository,
					  ProductRepository productRepository) {
		this.cartRepository = cartRepository;
		this.cartItemRepository = cartItemRepository;
		this.userRepository = userRepository;
		this.productRepository = productRepository;
	}

	@PostMapping
	public ResponseEntity<Cart> create(@RequestBody Cart cart) {
		return ResponseEntity.status(HttpStatus.CREATED).body(cartRepository.save(cart));
	}

	@PostMapping("/items")
	public ResponseEntity<Cart> addOrUpdateItem(@RequestBody CartItemRequest request) {
		User user = userRepository.findById(request.getUserId())
				.orElseThrow(() -> new ResourceNotFoundException("User not found: " + request.getUserId()));

		Product product = productRepository.findById(request.getProductId())
				.orElseThrow(() -> new ResourceNotFoundException("Product not found: " + request.getProductId()));

		if (request.getQuantity() == null || request.getQuantity() <= 0) {
			throw new IllegalArgumentException("Quantity must be at least 1");
		}

		Cart cart = cartRepository.findByUserId(user.getId()).orElseGet(() -> {
			Cart newCart = new Cart();
			newCart.setUser(user);
			return newCart;
		});

		Optional<CartItem> existingItem = cart.getItems().stream()
				.filter(item -> item.getProduct().getId().equals(product.getId()))
				.findFirst();

		if (existingItem.isPresent()) {
			CartItem item = existingItem.get();
			item.setQuantity(request.getQuantity());
			if (item.getQuantity() <= 0) {
				cart.getItems().remove(item);
			}
		} else {
			CartItem item = CartItem.builder()
					.cart(cart)
					.product(product)
					.quantity(request.getQuantity())
					.build();
			cart.getItems().add(item);
		}

		return ResponseEntity.ok(cartRepository.save(cart));
	}

	@PatchMapping("/items/{id}")
	public ResponseEntity<Cart> updateItem(@PathVariable Long id, @RequestParam Integer quantity) {
		CartItem item = cartItemRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Cart item not found: " + id));

		if (quantity == null || quantity <= 0) {
			return removeItem(id);
		}

		item.setQuantity(quantity);
		cartItemRepository.save(item);
		return ResponseEntity.ok(item.getCart());
	}

	@DeleteMapping("/items/{id}")
	public ResponseEntity<Cart> removeItem(@PathVariable Long id) {
		CartItem item = cartItemRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Cart item not found: " + id));
		Cart cart = item.getCart();
		cart.getItems().remove(item);
		cartItemRepository.delete(item);
		return ResponseEntity.ok(cartRepository.save(cart));
	}

	@DeleteMapping("/user/{userId}")
	public ResponseEntity<Void> clearCart(@PathVariable Long userId) {
		cartRepository.findByUserId(userId).ifPresent(cartRepository::delete);
		return ResponseEntity.noContent().build();
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

	public static class CartItemRequest {
		private Long userId;
		private Long productId;
		private Integer quantity;

		public Long getUserId() {
			return userId;
		}

		public void setUserId(Long userId) {
			this.userId = userId;
		}

		public Long getProductId() {
			return productId;
		}

		public void setProductId(Long productId) {
			this.productId = productId;
		}

		public Integer getQuantity() {
			return quantity;
		}

		public void setQuantity(Integer quantity) {
			this.quantity = quantity;
		}
	}
}
