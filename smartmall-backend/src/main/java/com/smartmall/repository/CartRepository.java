package com.smartmall.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.smartmall.entity.Cart;

public interface CartRepository extends JpaRepository<Cart, Long> {
	@EntityGraph(attributePaths = {"items", "items.product"})
	Optional<Cart> findByUserId(Long userId);

	@EntityGraph(attributePaths = {"items", "items.product"})
	Optional<Cart> findById(Long id);
}
