package com.smartmall.service;

import com.smartmall.entity.Notification;

import java.util.List;

public interface NotificationService {
	Notification create(Notification notification);

	List<Notification> getAll();

	Notification getById(Long id);

	Notification update(Long id, Notification notification);

	void delete(Long id);
}
