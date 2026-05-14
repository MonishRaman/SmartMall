package com.smartmall.exception;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import jakarta.validation.ConstraintViolationException;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<Map<String, Object>> handleNotFound(ResourceNotFoundException ex) {
		return build(HttpStatus.NOT_FOUND, ex.getMessage());
	}

	@ExceptionHandler(UnauthorizedException.class)
	public ResponseEntity<Map<String, Object>> handleUnauthorized(UnauthorizedException ex) {
		return build(HttpStatus.UNAUTHORIZED, ex.getMessage());
	}

	@ExceptionHandler(ValidationException.class)
	public ResponseEntity<Map<String, Object>> handleValidation(ValidationException ex) {
		return build(HttpStatus.BAD_REQUEST, ex.getMessage());
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<Map<String, Object>> handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {
		StringBuilder message = new StringBuilder("Validation failed: ");
		for (FieldError fieldError : ex.getBindingResult().getFieldErrors()) {
			message.append(fieldError.getField()).append(" ").append(fieldError.getDefaultMessage()).append("; ");
		}
		return build(HttpStatus.BAD_REQUEST, message.toString());
	}

	@ExceptionHandler(ConstraintViolationException.class)
	public ResponseEntity<Map<String, Object>> handleConstraintViolation(ConstraintViolationException ex) {
		return build(HttpStatus.BAD_REQUEST, ex.getMessage());
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<Map<String, Object>> handleGeneric(Exception ex) {
		return build(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
	}

	private ResponseEntity<Map<String, Object>> build(HttpStatus status, String message) {
		Map<String, Object> payload = new LinkedHashMap<>();
		payload.put("timestamp", Instant.now().toString());
		payload.put("status", status.value());
		payload.put("error", status.getReasonPhrase());
		payload.put("message", message);
		return ResponseEntity.status(status).body(payload);
	}
}
