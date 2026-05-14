package com.smartmall.service.impl;

import com.smartmall.entity.User;
import com.smartmall.exception.ResourceNotFoundException;
import com.smartmall.repository.UserRepository;
import com.smartmall.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

	public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}

	@Override
	@Transactional
	public User create(User user) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		if (user.getRole() == null || user.getRole().isBlank()) {
			user.setRole("CUSTOMER");
		}
		return userRepository.save(user);
	}

	@Override
	public List<User> getAll() {
		return userRepository.findAll();
	}

	@Override
	public User getById(Long id) {
		return userRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User not found: " + id));
	}

	@Override
	@Transactional
	public User update(Long id, User user) {
		User existing = getById(id);
		existing.setName(user.getName());
		existing.setEmail(user.getEmail());
		existing.setRole(user.getRole());
		if (user.getPassword() != null && !user.getPassword().isBlank()) {
			existing.setPassword(passwordEncoder.encode(user.getPassword()));
		}
		return userRepository.save(existing);
	}

	@Override
	@Transactional
	public void delete(Long id) {
		userRepository.delete(getById(id));
	}
}
