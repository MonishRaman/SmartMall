package com.smartmall.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smartmall.entity.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
}
