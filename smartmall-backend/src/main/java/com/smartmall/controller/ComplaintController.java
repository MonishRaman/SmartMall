package com.smartmall.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.smartmall.entity.Complaint;
import com.smartmall.exception.ResourceNotFoundException;
import com.smartmall.repository.ComplaintRepository;

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
	public ResponseEntity<List<Complaint>> getAll(@RequestParam(required = false) Long userId) {
		if (userId != null) {
			return ResponseEntity.ok(complaintRepository.findByUserId(userId));
		}
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
