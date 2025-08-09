package com.nhdinh.profile.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nhdinh.profile.model.Skill;

public interface SkillRepository extends JpaRepository<Skill, Long> {
    List<Skill> findAllByOrderByOrderIndexAsc();
    List<Skill> findByCategoryOrderByOrderIndexAsc(String category);
}
