package com.smartmall.controller;

import com.smartmall.entity.Complaint;
import com.smartmall.exception.ResourceNotFoundException;
import com.smartmall.repository.ComplaintRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/complaints")
public class ComplaintController {

	private final ComplaintRepository complaintRepository;

	public ComplaintController(ComplaintRepository complaintRepository) {
		this.complaintRepository = complaintRepository;
	}

	@PostMapping
	public ResponseEntity<Complaint> create(@RequestBody Complaint complaint) {
		return ResponseEntity.status(HttpStatus.CREATED).body(complaintRepository.save(complaint));
	}

	@GetMapping
	public ResponseEntity<List<Complaint>> getAll() {
		return ResponseEntity.ok(complaintRepository.findAll());
	}

	@GetMapping("/{id}")
	public ResponseEntity<Complaint> getById(@PathVariable Long id) {
		Complaint complaint = complaintRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Complaint not found: " + id));
		return ResponseEntity.ok(complaint);
	}

	@PatchMapping("/{id}/status")
	public ResponseEntity<Complaint> updateStatus(@PathVariable Long id, @RequestParam String status) {
		Complaint complaint = complaintRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Complaint not found: " + id));
		complaint.setStatus(status);
		return ResponseEntity.ok(complaintRepository.save(complaint));
	}
}
