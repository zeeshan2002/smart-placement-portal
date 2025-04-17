package com.placement.service.impl;

import com.placement.entity.Application;
import com.placement.entity.RecruitmentDrive;
import com.placement.entity.Student;
import com.placement.enums.ApplicationStatus;
import com.placement.enums.DriveStatus;
import com.placement.repository.ApplicationRepository;
import com.placement.repository.RecruitmentDriveRepository;
import com.placement.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private RecruitmentDriveRepository driveRepository;

    public Application applyToDrive(Long studentId, Long driveId) {
        // Check if student exists
        Optional<Student> studentOpt = studentRepository.findById(studentId);
        if (studentOpt.isEmpty()) {
            throw new RuntimeException("Student not found");
        }

        // Check if drive exists and is open
        Optional<RecruitmentDrive> driveOpt = driveRepository.findById(driveId);
        if (driveOpt.isEmpty()) {
            throw new RuntimeException("Recruitment drive not found");
        }

        RecruitmentDrive drive = driveOpt.get();
        if (DriveStatus.CLOSED.equals(drive.getStatus())) {
            throw new RuntimeException("This recruitment drive is not accepting applications");
        }

        // Check if application deadline has passed
        if (drive.getDeadline().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Application deadline has passed");
        }

        // Check if student has already applied
        Optional<Application> existingApplication = applicationRepository.findByStudentIdAndDriveId(studentId, driveId);
        if (existingApplication.isPresent()) {
            throw new RuntimeException("You have already applied to this drive");
        }

        // Create new application
        Application application = new Application();
        application.setStudent(studentOpt.get());
        application.setDrive(drive);
        application.setStatus(ApplicationStatus.PENDING);
        application.setAppliedDate(LocalDateTime.now());

        return applicationRepository.save(application);
    }

    public List<Application> getApplicationsByStudentId(Long studentId) {
        return applicationRepository.findByStudentId(studentId);
    }

    public List<Application> getApplicationsByDriveId(Long driveId) {
        return applicationRepository.findByDriveId(driveId);
    }

    public Application updateApplicationStatus(Long applicationId, String status) {
        Optional<Application> applicationOpt = applicationRepository.findById(applicationId);
        if (applicationOpt.isEmpty()) {
            throw new RuntimeException("Application not found");
        }

        Application application = applicationOpt.get();
//        application.setStatus(status);
        return applicationRepository.save(application);
    }
} 