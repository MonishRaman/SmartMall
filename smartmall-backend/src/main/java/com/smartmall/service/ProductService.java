package com.smartmall.service;

import com.smartmall.entity.Product;

import java.util.List;

public interface ProductService {
	Product create(Product product);

	List<Product> getAll();

	List<Product> getByShopId(Long shopId);

	Product getById(Long id);

	Product update(Long id, Product product);

	void delete(Long id);
}
