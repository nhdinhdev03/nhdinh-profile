package com.nhdinh.profile.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nhdinh.profile.model.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {}

