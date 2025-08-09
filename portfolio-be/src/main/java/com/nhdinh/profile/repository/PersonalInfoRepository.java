package com.nhdinh.profile.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nhdinh.profile.model.PersonalInfo;

public interface PersonalInfoRepository extends JpaRepository<PersonalInfo, Long> {
}
