package com.smartmall.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name = "complaints")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Complaint {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "shop_id")
	private Shop shop;

	@Column(nullable = false, length = 2000)
	private String description;

	@Column(nullable = false)
	private String status;

	private Instant createdAt;

	@PrePersist
	public void onCreate() {
		if (createdAt == null) {
			createdAt = Instant.now();
		}
		if (status == null) {
			status = "OPEN";
		}
	}
}
