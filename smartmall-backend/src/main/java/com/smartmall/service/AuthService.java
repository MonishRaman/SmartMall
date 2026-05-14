package com.smartmall.service;

import com.smartmall.dto.LoginRequest;
import com.smartmall.dto.LoginResponse;
import com.smartmall.dto.RegisterRequest;

public interface AuthService {
	LoginResponse login(LoginRequest request);

	LoginResponse register(RegisterRequest request);
}
