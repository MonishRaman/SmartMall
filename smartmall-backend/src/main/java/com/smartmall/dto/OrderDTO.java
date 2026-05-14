package com.smartmall.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Map;

@Data
public class OrderDTO {
	private Long userId;
	private String status;
	private BigDecimal totalAmount;
	private Map<Long, Integer> productQuantities;
}
