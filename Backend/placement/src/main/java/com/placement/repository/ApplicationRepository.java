package com.placement.repository;

import com.placement.entity.Application;
import com.placement.enums.ApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByStudentId(Long studentId);
    List<Application> findByDriveId(Long driveId);
    Optional<Application> findByStudentIdAndDriveId(Long studentId, Long driveId);

    Long countByStatus(ApplicationStatus status);
}