package com.smartmall.service;

import com.smartmall.entity.Cart;

import java.util.List;

public interface CartService {
	Cart create(Cart cart);

	List<Cart> getAll();

	Cart getById(Long id);

	Cart update(Long id, Cart cart);

	void delete(Long id);
}
