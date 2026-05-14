package com.smartmall.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smartmall.entity.Event;

public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByNameContainingIgnoreCase(String name);
}
