package com.smartmall.service;

import com.smartmall.dto.PaymentDTO;
import com.smartmall.entity.Payment;

import java.util.List;

public interface PaymentService {
	Payment create(PaymentDTO paymentDTO);

	List<Payment> getAll();

	Payment getById(Long id);

	Payment getByOrderId(Long orderId);

	Payment updateStatus(Long id, String status);
}
