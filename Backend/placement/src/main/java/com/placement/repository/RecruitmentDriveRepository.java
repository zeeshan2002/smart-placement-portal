package com.placement.repository;

import com.placement.entity.RecruitmentDrive;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecruitmentDriveRepository extends JpaRepository<RecruitmentDrive, Long> {
    List<RecruitmentDrive> findByStatus(String status);
    List<RecruitmentDrive> findByRecruiterId(Long recruiterId);
} 