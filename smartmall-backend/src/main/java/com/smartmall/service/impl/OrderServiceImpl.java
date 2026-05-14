package com.smartmall.service.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smartmall.dto.OrderDTO;
import com.smartmall.entity.Order;
import com.smartmall.entity.OrderItem;
import com.smartmall.entity.Payment;
import com.smartmall.entity.Product;
import com.smartmall.entity.User;
import com.smartmall.exception.ResourceNotFoundException;
import com.smartmall.repository.CartRepository;
import com.smartmall.repository.OrderRepository;
import com.smartmall.repository.PaymentRepository;
import com.smartmall.repository.ProductRepository;
import com.smartmall.repository.UserRepository;
import com.smartmall.service.OrderService;

@Service
public class OrderServiceImpl implements OrderService {

	private final OrderRepository orderRepository;
	private final UserRepository userRepository;
	private final ProductRepository productRepository;
	private final CartRepository cartRepository;
	private final PaymentRepository paymentRepository;

	public OrderServiceImpl(OrderRepository orderRepository,
					UserRepository userRepository,
					ProductRepository productRepository,
					CartRepository cartRepository,
					PaymentRepository paymentRepository) {
		this.orderRepository = orderRepository;
		this.userRepository = userRepository;
		this.productRepository = productRepository;
		this.cartRepository = cartRepository;
		this.paymentRepository = paymentRepository;
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
				if (quantity <= 0) {
					throw new IllegalArgumentException("Order quantity must be greater than zero");
				}
				if (product.getStockQuantity() != null && product.getStockQuantity() < quantity) {
					throw new IllegalArgumentException("Not enough stock for product: " + product.getName());
				}

				OrderItem item = OrderItem.builder()
						.order(order)
						.product(product)
						.quantity(quantity)
						.unitPrice(product.getPrice())
						.build();
				items.add(item);
				computedTotal = computedTotal.add(product.getPrice().multiply(BigDecimal.valueOf(quantity)));

				if (product.getStockQuantity() != null) {
					product.setStockQuantity(product.getStockQuantity() - quantity);
					productRepository.save(product);
				}
			}
		}

		order.setItems(items);
		order.setTotalAmount(orderDTO.getTotalAmount() != null ? orderDTO.getTotalAmount() : computedTotal);
		Order savedOrder = orderRepository.save(order);

		cartRepository.findByUserId(user.getId()).ifPresent(cartRepository::delete);

		Payment payment = Payment.builder()
				.order(savedOrder)
				.amount(savedOrder.getTotalAmount())
				.method("CARD")
				.status("COMPLETED")
				.transactionId("AUTO-" + UUID.randomUUID())
				.build();
		paymentRepository.save(payment);

		return savedOrder;
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
	public List<Order> getByShopId(Long shopId) {
		return orderRepository.findByItemsProductShopId(shopId);
	}

	@Override
	@Transactional
	public Order updateStatus(Long id, String status) {
		Order order = getById(id);
		order.setStatus(status);
		return orderRepository.save(order);
	}
}
