package com.nhdinh.profile.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nhdinh.profile.model.Experience;

public interface ExperienceRepository extends JpaRepository<Experience, Long> {
    List<Experience> findAllByOrderByStartDateDesc();
}
