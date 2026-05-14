package com.smartmall.service.impl;

import com.smartmall.entity.Product;
import com.smartmall.entity.Shop;
import com.smartmall.exception.ResourceNotFoundException;
import com.smartmall.repository.ProductRepository;
import com.smartmall.repository.ShopRepository;
import com.smartmall.service.ProductService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

	private final ProductRepository productRepository;
	private final ShopRepository shopRepository;

	public ProductServiceImpl(ProductRepository productRepository, ShopRepository shopRepository) {
		this.productRepository = productRepository;
		this.shopRepository = shopRepository;
	}

	@Override
	@Transactional
	public Product create(Product product) {
		Long shopId = product.getShop() != null ? product.getShop().getId() : null;
		if (shopId == null) {
			throw new ResourceNotFoundException("Shop id is required");
		}
		Shop shop = shopRepository.findById(shopId)
				.orElseThrow(() -> new ResourceNotFoundException("Shop not found: " + shopId));
		product.setShop(shop);
		return productRepository.save(product);
	}

	@Override
	public List<Product> getAll() {
		return productRepository.findAll();
	}

	@Override
	public List<Product> getByShopId(Long shopId) {
		return productRepository.findByShopId(shopId);
	}

	@Override
	public Product getById(Long id) {
		return productRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Product not found: " + id));
	}

	@Override
	@Transactional
	public Product update(Long id, Product product) {
		Product existing = getById(id);
		existing.setName(product.getName());
		existing.setDescription(product.getDescription());
		existing.setCategory(product.getCategory());
		existing.setPrice(product.getPrice());
		existing.setStockQuantity(product.getStockQuantity());
		if (product.getShop() != null && product.getShop().getId() != null) {
			Shop shop = shopRepository.findById(product.getShop().getId())
					.orElseThrow(() -> new ResourceNotFoundException("Shop not found: " + product.getShop().getId()));
			existing.setShop(shop);
		}
		return productRepository.save(existing);
	}

	@Override
	@Transactional
	public void delete(Long id) {
		productRepository.delete(getById(id));
	}
}
