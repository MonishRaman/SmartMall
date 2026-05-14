package com.smartmall.service;

import com.smartmall.entity.User;

import java.util.List;

public interface UserService {
	User create(User user);

	List<User> getAll();

	User getById(Long id);

	User update(Long id, User user);

	void delete(Long id);
}
