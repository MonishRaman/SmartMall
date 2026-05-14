package com.smartmall.controller;

import com.smartmall.entity.ParkingSlot;
import com.smartmall.repository.ParkingRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parking")
public class ParkingController {

	private final ParkingRepository parkingRepository;

	public ParkingController(ParkingRepository parkingRepository) {
		this.parkingRepository = parkingRepository;
	}

	@PostMapping("/slots")
	public ResponseEntity<ParkingSlot> createSlot(@RequestBody ParkingSlot slot) {
		return ResponseEntity.status(HttpStatus.CREATED).body(parkingRepository.save(slot));
	}

	@GetMapping("/slots")
	public ResponseEntity<List<ParkingSlot>> getSlots(@RequestParam(required = false) Boolean occupied) {
		if (occupied != null) {
			return ResponseEntity.ok(parkingRepository.findByOccupied(occupied));
		}
		return ResponseEntity.ok(parkingRepository.findAll());
	}

	@PatchMapping("/slots/{id}/occupied")
	public ResponseEntity<ParkingSlot> updateOccupied(@PathVariable Long id, @RequestParam boolean occupied) {
		ParkingSlot slot = parkingRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Parking slot not found: " + id));
		slot.setOccupied(occupied);
		return ResponseEntity.ok(parkingRepository.save(slot));
	}
}
