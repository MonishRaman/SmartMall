package com.smartmall.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "parking_slots")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ParkingSlot {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false, unique = true)
	private String slotNumber;

	@Column(nullable = false)
	private String level;

	@Column(nullable = false)
	private Boolean occupied;

	@PrePersist
	public void onCreate() {
		if (occupied == null) {
			occupied = false;
		}
	}
}
