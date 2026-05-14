package com.smartmall.service.impl;

import com.smartmall.dto.PaymentDTO;
import com.smartmall.entity.Order;
import com.smartmall.entity.Payment;
import com.smartmall.exception.ResourceNotFoundException;
import com.smartmall.repository.OrderRepository;
import com.smartmall.repository.PaymentRepository;
import com.smartmall.service.PaymentService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PaymentServiceImpl implements PaymentService {

	private final PaymentRepository paymentRepository;
	private final OrderRepository orderRepository;

	public PaymentServiceImpl(PaymentRepository paymentRepository, OrderRepository orderRepository) {
		this.paymentRepository = paymentRepository;
		this.orderRepository = orderRepository;
	}

	@Override
	@Transactional
	public Payment create(PaymentDTO paymentDTO) {
		Order order = orderRepository.findById(paymentDTO.getOrderId())
				.orElseThrow(() -> new ResourceNotFoundException("Order not found: " + paymentDTO.getOrderId()));

		Payment payment = Payment.builder()
				.order(order)
				.amount(paymentDTO.getAmount())
				.method(paymentDTO.getMethod())
				.status(paymentDTO.getStatus())
				.transactionId(paymentDTO.getTransactionId())
				.build();
		return paymentRepository.save(payment);
	}

	@Override
	public List<Payment> getAll() {
		return paymentRepository.findAll();
	}

	@Override
	public Payment getById(Long id) {
		return paymentRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Payment not found: " + id));
	}

	@Override
	public Payment getByOrderId(Long orderId) {
		return paymentRepository.findByOrderId(orderId)
				.orElseThrow(() -> new ResourceNotFoundException("Payment not found for order: " + orderId));
	}

	@Override
	@Transactional
	public Payment updateStatus(Long id, String status) {
		Payment payment = getById(id);
		payment.setStatus(status);
		return paymentRepository.save(payment);
	}
}
