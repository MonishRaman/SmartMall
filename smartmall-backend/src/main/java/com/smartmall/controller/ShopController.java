package com.smartmall.controller;

import com.smartmall.entity.Shop;
import com.smartmall.service.ShopService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shops")
public class ShopController {

	private final ShopService shopService;

	public ShopController(ShopService shopService) {
		this.shopService = shopService;
	}

	@PostMapping
	public ResponseEntity<Shop> create(@RequestBody Shop shop) {
		return ResponseEntity.status(HttpStatus.CREATED).body(shopService.create(shop));
	}

	@GetMapping
	public ResponseEntity<List<Shop>> getAll() {
		return ResponseEntity.ok(shopService.getAll());
	}

	@GetMapping("/{id}")
	public ResponseEntity<Shop> getById(@PathVariable Long id) {
		return ResponseEntity.ok(shopService.getById(id));
	}

	@PutMapping("/{id}")
	public ResponseEntity<Shop> update(@PathVariable Long id, @RequestBody Shop shop) {
		return ResponseEntity.ok(shopService.update(id, shop));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		shopService.delete(id);
		return ResponseEntity.noContent().build();
	}
}
