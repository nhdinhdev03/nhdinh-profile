package com.nhdinh.profile.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nhdinh.profile.model.ContactMessage;

public interface ContactRepository extends JpaRepository<ContactMessage,Long> {}
