package com.smartmall.controller;

import com.smartmall.entity.Product;
import com.smartmall.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

	private final ProductService productService;

	public ProductController(ProductService productService) {
		this.productService = productService;
	}

	@PostMapping
	public ResponseEntity<Product> create(@RequestBody Product product) {
		return ResponseEntity.status(HttpStatus.CREATED).body(productService.create(product));
	}

	@GetMapping
	public ResponseEntity<List<Product>> getAll(@RequestParam(required = false) Long shopId) {
		if (shopId != null) {
			return ResponseEntity.ok(productService.getByShopId(shopId));
		}
		return ResponseEntity.ok(productService.getAll());
	}

	@GetMapping("/{id}")
	public ResponseEntity<Product> getById(@PathVariable Long id) {
		return ResponseEntity.ok(productService.getById(id));
	}

	@PutMapping("/{id}")
	public ResponseEntity<Product> update(@PathVariable Long id, @RequestBody Product product) {
		return ResponseEntity.ok(productService.update(id, product));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		productService.delete(id);
		return ResponseEntity.noContent().build();
	}
}
