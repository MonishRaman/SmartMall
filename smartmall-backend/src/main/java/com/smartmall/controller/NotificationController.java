package com.smartmall.controller;

import com.smartmall.entity.Notification;
import com.smartmall.repository.NotificationRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

	private final NotificationRepository notificationRepository;

	public NotificationController(NotificationRepository notificationRepository) {
		this.notificationRepository = notificationRepository;
	}

	@PostMapping
	public ResponseEntity<Notification> create(@RequestBody Notification notification) {
		return ResponseEntity.status(HttpStatus.CREATED).body(notificationRepository.save(notification));
	}

	@GetMapping
	public ResponseEntity<List<Notification>> getAll(@RequestParam(required = false) Long userId) {
		if (userId != null) {
			return ResponseEntity.ok(notificationRepository.findByUserIdOrderByCreatedAtDesc(userId));
		}
		return ResponseEntity.ok(notificationRepository.findAll());
	}

	@PatchMapping("/{id}/read")
	public ResponseEntity<Notification> markRead(@PathVariable Long id) {
		Notification notification = notificationRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Notification not found: " + id));
		notification.setIsRead(true);
		return ResponseEntity.ok(notificationRepository.save(notification));
	}
}
