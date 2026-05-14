package com.smartmall.service;

import com.smartmall.dto.OrderDTO;
import com.smartmall.entity.Order;

import java.util.List;

public interface OrderService {
	Order create(OrderDTO orderDTO);

	List<Order> getAll();

	List<Order> getByUserId(Long userId);

	Order getById(Long id);

	Order updateStatus(Long id, String status);
}
