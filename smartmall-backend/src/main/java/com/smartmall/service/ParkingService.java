package com.smartmall.service;

import com.smartmall.entity.ParkingSlot;

import java.util.List;

public interface ParkingService {
	ParkingSlot create(ParkingSlot parkingSlot);

	List<ParkingSlot> getAll();

	ParkingSlot getById(Long id);

	ParkingSlot update(Long id, ParkingSlot parkingSlot);

	void delete(Long id);
}
