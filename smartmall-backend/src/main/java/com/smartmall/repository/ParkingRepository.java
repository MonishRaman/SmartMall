package com.smartmall.repository;

import com.smartmall.entity.ParkingSlot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ParkingRepository extends JpaRepository<ParkingSlot, Long> {
	List<ParkingSlot> findByOccupied(Boolean occupied);
}
