package com.smartmall.dto;

import lombok.Data;

@Data
public class ShopDTO {
	private String shopName;
	private String category;
	private Integer floorNumber;
	private Double monthlyRent;
	private String status;
}
