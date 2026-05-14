package com.smartmall.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name = "notifications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	@Column(nullable = false, length = 1000)
	private String message;

	@Column(nullable = false)
	private Boolean isRead;

	private Instant createdAt;

	@PrePersist
	public void onCreate() {
		if (createdAt == null) {
			createdAt = Instant.now();
		}
		if (isRead == null) {
			isRead = false;
		}
	}
}
