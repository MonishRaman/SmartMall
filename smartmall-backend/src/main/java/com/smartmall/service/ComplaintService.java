package com.smartmall.service;

import com.smartmall.entity.Complaint;

import java.util.List;

public interface ComplaintService {
	Complaint create(Complaint complaint);

	List<Complaint> getAll();

	Complaint getById(Long id);

	Complaint update(Long id, Complaint complaint);

	void delete(Long id);
}
