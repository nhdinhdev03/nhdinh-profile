package com.nhdinh.profile.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nhdinh.profile.model.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByFeaturedTrue();
}
