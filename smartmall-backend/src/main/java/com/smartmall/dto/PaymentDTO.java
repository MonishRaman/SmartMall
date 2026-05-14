package com.smartmall.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class PaymentDTO {
	private Long orderId;
	private BigDecimal amount;
	private String method;
	private String status;
	private String transactionId;
}
