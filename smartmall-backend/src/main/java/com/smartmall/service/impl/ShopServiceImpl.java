package com.smartmall.service.impl;

import com.smartmall.entity.Shop;
import com.smartmall.exception.ResourceNotFoundException;
import com.smartmall.repository.ShopRepository;
import com.smartmall.service.ShopService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ShopServiceImpl implements ShopService {

	private final ShopRepository shopRepository;

	public ShopServiceImpl(ShopRepository shopRepository) {
		this.shopRepository = shopRepository;
	}

	@Override
	@Transactional
	public Shop create(Shop shop) {
		return shopRepository.save(shop);
	}

	@Override
	public List<Shop> getAll() {
		return shopRepository.findAll();
	}

	@Override
	public Shop getById(Long id) {
		return shopRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Shop not found: " + id));
	}

	@Override
	@Transactional
	public Shop update(Long id, Shop shop) {
		Shop existing = getById(id);
		existing.setShopName(shop.getShopName());
		existing.setCategory(shop.getCategory());
		existing.setFloorNumber(shop.getFloorNumber());
		existing.setMonthlyRent(shop.getMonthlyRent());
		existing.setStatus(shop.getStatus());
		return shopRepository.save(existing);
	}

	@Override
	@Transactional
	public void delete(Long id) {
		shopRepository.delete(getById(id));
	}
}
