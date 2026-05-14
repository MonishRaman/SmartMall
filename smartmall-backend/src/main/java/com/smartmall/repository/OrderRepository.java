package com.smartmall.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.smartmall.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
	@EntityGraph(attributePaths = {"user", "items", "items.product", "items.product.shop"})
	List<Order> findAll();

	@EntityGraph(attributePaths = {"user", "items", "items.product", "items.product.shop"})
	List<Order> findByUserId(Long userId);

	@EntityGraph(attributePaths = {"user", "items", "items.product", "items.product.shop"})
	Optional<Order> findById(Long id);

	@Query("select distinct o from Order o join o.items i where i.product.shop.id = :shopId")
	@EntityGraph(attributePaths = {"user", "items", "items.product", "items.product.shop"})
	List<Order> findByItemsProductShopId(@Param("shopId") Long shopId);
}
