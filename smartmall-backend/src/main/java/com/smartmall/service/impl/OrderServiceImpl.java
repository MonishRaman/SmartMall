package com.smartmall.service.impl;

import com.smartmall.dto.OrderDTO;
import com.smartmall.entity.Order;
import com.smartmall.entity.OrderItem;
import com.smartmall.entity.Product;
import com.smartmall.entity.User;
import com.smartmall.exception.ResourceNotFoundException;
import com.smartmall.repository.OrderRepository;
import com.smartmall.repository.ProductRepository;
import com.smartmall.repository.UserRepository;
import com.smartmall.service.OrderService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class OrderServiceImpl implements OrderService {

	private final OrderRepository orderRepository;
	private final UserRepository userRepository;
	private final ProductRepository productRepository;

	public OrderServiceImpl(OrderRepository orderRepository,
							UserRepository userRepository,
							ProductRepository productRepository) {
		this.orderRepository = orderRepository;
		this.userRepository = userRepository;
		this.productRepository = productRepository;
	}

	@Override
	@Transactional
	public Order create(OrderDTO orderDTO) {
		User user = userRepository.findById(orderDTO.getUserId())
				.orElseThrow(() -> new ResourceNotFoundException("User not found: " + orderDTO.getUserId()));

		Order order = new Order();
		order.setUser(user);
		order.setStatus(orderDTO.getStatus() == null ? "PENDING" : orderDTO.getStatus());

		List<OrderItem> items = new ArrayList<>();
		BigDecimal computedTotal = BigDecimal.ZERO;

		Map<Long, Integer> productQuantities = orderDTO.getProductQuantities();
		if (productQuantities != null) {
			for (Map.Entry<Long, Integer> entry : productQuantities.entrySet()) {
				Product product = productRepository.findById(entry.getKey())
						.orElseThrow(() -> new ResourceNotFoundException("Product not found: " + entry.getKey()));
				int quantity = entry.getValue();

				OrderItem item = OrderItem.builder()
						.order(order)
						.product(product)
						.quantity(quantity)
						.unitPrice(product.getPrice())
						.build();
				items.add(item);
				computedTotal = computedTotal.add(product.getPrice().multiply(BigDecimal.valueOf(quantity)));
			}
		}

		order.setItems(items);
		order.setTotalAmount(orderDTO.getTotalAmount() != null ? orderDTO.getTotalAmount() : computedTotal);
		return orderRepository.save(order);
	}

	@Override
	public List<Order> getAll() {
		return orderRepository.findAll();
	}

	@Override
	public List<Order> getByUserId(Long userId) {
		return orderRepository.findByUserId(userId);
	}

	@Override
	public Order getById(Long id) {
		return orderRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Order not found: " + id));
	}

	@Override
	@Transactional
	public Order updateStatus(Long id, String status) {
		Order order = getById(id);
		order.setStatus(status);
		return orderRepository.save(order);
	}
}
