package com.smartmall.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smartmall.entity.Shop;

public interface ShopRepository extends JpaRepository<Shop, Long> {
	Optional<Shop> findFirstByOwnerUserId(Long ownerUserId);

	Optional<Shop> findFirstByOwnerEmail(String ownerEmail);
}
