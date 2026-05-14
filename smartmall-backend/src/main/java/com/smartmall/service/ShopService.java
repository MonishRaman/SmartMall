package com.smartmall.service;

import com.smartmall.entity.Shop;

import java.util.List;

public interface ShopService {
	Shop create(Shop shop);

	List<Shop> getAll();

	Shop getById(Long id);

	Shop update(Long id, Shop shop);

	void delete(Long id);
}
