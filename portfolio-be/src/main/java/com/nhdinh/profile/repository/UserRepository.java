package com.nhdinh.profile.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nhdinh.profile.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String u);

    boolean existsByUsername(String u);

    boolean existsByEmail(String e);
}
