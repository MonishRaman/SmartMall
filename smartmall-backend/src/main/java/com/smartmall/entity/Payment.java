package com.smartmall.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "payments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "order_id", nullable = false, unique = true)
	private Order order;

	@Column(nullable = false, precision = 12, scale = 2)
	private BigDecimal amount;

	@Column(nullable = false)
	private String method;

	@Column(nullable = false)
	private String status;

	private String transactionId;
	private Instant paidAt;

	@PrePersist
	public void onCreate() {
		if (paidAt == null) {
			paidAt = Instant.now();
		}
		if (status == null) {
			status = "INITIATED";
		}
	}
}
