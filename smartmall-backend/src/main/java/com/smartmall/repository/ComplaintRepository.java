package com.smartmall.repository;

import com.smartmall.entity.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
	List<Complaint> findByUserId(Long userId);
}
