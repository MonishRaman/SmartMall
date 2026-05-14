package com.smartmall.dto;

import com.smartmall.entity.Category;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductDTO {
	private String name;
	private String description;
	private Category category;
	private BigDecimal price;
	private Integer stockQuantity;
	private Long shopId;
}
