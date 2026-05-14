package com.smartmall.service;

import java.util.List;

import com.smartmall.dto.OrderDTO;
import com.smartmall.entity.Order;

public interface OrderService {
	Order create(OrderDTO orderDTO);

	List<Order> getAll();

	List<Order> getByUserId(Long userId);

	List<Order> getByShopId(Long shopId);

	Order getById(Long id);

	Order updateStatus(Long id, String status);
}
