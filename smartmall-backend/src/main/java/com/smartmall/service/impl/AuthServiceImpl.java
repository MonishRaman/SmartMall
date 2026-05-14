package com.smartmall.service.impl;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smartmall.dto.LoginRequest;
import com.smartmall.dto.LoginResponse;
import com.smartmall.dto.RegisterRequest;
import com.smartmall.entity.Shop;
import com.smartmall.entity.User;
import com.smartmall.exception.ValidationException;
import com.smartmall.repository.ShopRepository;
import com.smartmall.repository.UserRepository;
import com.smartmall.security.JwtService;
import com.smartmall.service.AuthService;

@Service
public class AuthServiceImpl implements AuthService {

	private final AuthenticationManager authenticationManager;
	private final UserDetailsService userDetailsService;
	private final UserRepository userRepository;
	private final ShopRepository shopRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;

	public AuthServiceImpl(AuthenticationManager authenticationManager,
						   UserDetailsService userDetailsService,
						   UserRepository userRepository,
					   ShopRepository shopRepository,
						   PasswordEncoder passwordEncoder,
						   JwtService jwtService) {
		this.authenticationManager = authenticationManager;
		this.userDetailsService = userDetailsService;
		this.userRepository = userRepository;
		this.shopRepository = shopRepository;
		this.passwordEncoder = passwordEncoder;
		this.jwtService = jwtService;
	}

	@Override
	public LoginResponse login(LoginRequest request) {
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
		);
		User user = userRepository.findByEmail(request.getEmail())
				.orElseThrow(() -> new ValidationException("Invalid credentials"));

		UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
		String token = jwtService.generateToken(userDetails);

		return LoginResponse.builder()
				.token(token)
				.tokenType("Bearer")
				.userId(user.getId())
				.shopId(resolveShopId(user))
				.name(user.getName())
				.email(user.getEmail())
				.role(user.getRole())
				.build();
	}

	@Override
	@Transactional
	public LoginResponse register(RegisterRequest request) {
		if (userRepository.existsByEmail(request.getEmail())) {
			throw new ValidationException("Email already registered");
		}

		User user = new User();
		user.setName(request.getName());
		user.setEmail(request.getEmail());
		user.setPassword(passwordEncoder.encode(request.getPassword()));
		user.setRole(normalizeRole(request.getRole()));
		user = userRepository.save(user);

		Long shopId = null;
		if ("SHOP_OWNER".equalsIgnoreCase(user.getRole())) {
			Shop shop = Shop.builder()
					.shopName(isBlank(request.getShopName()) ? user.getName() : request.getShopName())
					.category(isBlank(request.getCategory()) ? "GENERAL" : request.getCategory())
					.floorNumber(request.getFloorNumber())
					.monthlyRent(request.getMonthlyRent())
					.status("ACTIVE")
					.ownerUserId(user.getId())
					.ownerName(user.getName())
					.ownerEmail(user.getEmail())
					.build();
			shopId = shopRepository.save(shop).getId();
		}

		UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
		String token = jwtService.generateToken(userDetails);

		return LoginResponse.builder()
				.token(token)
				.tokenType("Bearer")
				.userId(user.getId())
				.shopId(shopId)
				.name(user.getName())
				.email(user.getEmail())
				.role(user.getRole())
				.build();
	}

	private Long resolveShopId(User user) {
		if (!"SHOP_OWNER".equalsIgnoreCase(user.getRole())) {
			return null;
		}

		return shopRepository.findFirstByOwnerUserId(user.getId())
				.map(Shop::getId)
				.or(() -> shopRepository.findFirstByOwnerEmail(user.getEmail()).map(Shop::getId))
				.orElse(null);
	}

	private String normalizeRole(String role) {
		if (role == null || role.isBlank()) {
			return "CUSTOMER";
		}

		String normalized = role.trim().toUpperCase();
		if ("SHOPKEEPER".equals(normalized)) {
			return "SHOP_OWNER";
		}
		return normalized;
	}

	private boolean isBlank(String value) {
		return value == null || value.isBlank();
	}
}
