package com.placement.service;

import com.placement.entity.Recruiter;
import com.placement.entity.RecruitmentDrive;
import com.placement.entity.Application;
import com.placement.enums.ApplicationStatus;

import java.util.List;

public interface RecruiterService {
    // Recruiter registerRecruiter(Recruiter recruiter);
    Recruiter getRecruiterProfile(Long recruiterId);
    Recruiter updateRecruiterProfile(Recruiter recruiter);
    List<RecruitmentDrive> getRecruiterDrives(Long recruiterId);
    RecruitmentDrive createDrive(Long recruiterId, RecruitmentDrive drive);
    RecruitmentDrive updateDrive(Long recruiterId, Long driveId, RecruitmentDrive drive);
    void deleteDrive(Long recruiterId, Long driveId);
    List<Application> getDriveApplications(Long driveId);
    Application updateApplicationStatus(Long applicationId, ApplicationStatus status);
    String createRecruiter(Recruiter recruiter);
    boolean verifyEmail(String token);
    Recruiter login(String email, String password);
    RecruitmentDrive getDrive(Long driveId);
}
