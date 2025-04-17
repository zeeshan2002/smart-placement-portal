package com.placement.service.impl;

import com.placement.entity.Recruiter;
import com.placement.entity.RecruitmentDrive;
import com.placement.entity.Application;
import com.placement.repository.RecruiterRepository;
import com.placement.repository.RecruitmentDriveRepository;
import com.placement.repository.ApplicationRepository;
import com.placement.service.RecruiterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import com.placement.enums.RecruiterStatus;
import com.placement.enums.DriveStatus;
import com.placement.service.EmailService;
import java.util.UUID;
import com.placement.enums.ApplicationStatus;

@Service
public class RecruiterServiceImpl implements RecruiterService {

    @Autowired
    private RecruiterRepository recruiterRepository;

    @Autowired
    private RecruitmentDriveRepository driveRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private EmailService emailService;

    public String createRecruiter(Recruiter recruiter) {
        if(recruiterRepository.existsByEmail(recruiter.getEmail())){
            return "Email already exist";
        }
        String token = UUID.randomUUID().toString();
        recruiter.setEmailVerified(false);
        recruiter.setVerificationToken(token);
        recruiter.setStatus(RecruiterStatus.PENDING);
        recruiterRepository.save(recruiter);
        String verificationLink = "http://localhost:8080/api/recruiters/verify-email?token="+token;
        emailService.sendVerificationEmail(recruiter.getEmail(), verificationLink);
        return "Registration successfully, check your email";
    }

    public boolean verifyEmail(String token) {
        Recruiter recruiter = recruiterRepository.findByVerificationToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid Token"));
        recruiter.setEmailVerified(true);
        recruiter.setVerificationToken(null);
        recruiterRepository.save(recruiter);
        return true;
    }

    public Recruiter login(String email, String password) {
        Recruiter recruiter = recruiterRepository.findByEmailAndPassword(email, password)
                .orElseThrow(() -> new RuntimeException("Invalid Email id or password"));
        return recruiter.getEmailVerified() ? recruiter : new Recruiter();
    }


    @Override
    public Recruiter getRecruiterProfile(Long recruiterId) {
        return recruiterRepository.findById(recruiterId)
                .orElseThrow(() -> new RuntimeException("Recruiter not found"));
    }

    @Override
    public Recruiter updateRecruiterProfile(Recruiter recruiter) {
        Recruiter existingRecruiter = getRecruiterProfile(recruiter.getId());
        existingRecruiter.setName(recruiter.getName());
        existingRecruiter.setEmail(recruiter.getEmail());
        existingRecruiter.setPhone(recruiter.getPhone());
        existingRecruiter.setCompanyName(recruiter.getCompanyName());
        existingRecruiter.setDesignation(recruiter.getDesignation());
        if(recruiter.getPassword() != ""){
            existingRecruiter.setPassword(recruiter.getPassword());
        }
        return recruiterRepository.save(existingRecruiter);
    }

    @Override
    public List<RecruitmentDrive> getRecruiterDrives(Long recruiterId) {
        return driveRepository.findByRecruiterId(recruiterId);
    }


    @Override
    public RecruitmentDrive createDrive(Long recruiterId, RecruitmentDrive drive) {
        Recruiter recruiter = getRecruiterProfile(recruiterId);
        drive.setRecruiter(recruiter);
        drive.setStatus(DriveStatus.OPEN);
        return driveRepository.save(drive);
    }

    @Override
    public RecruitmentDrive updateDrive(Long recruiterId, Long driveId, RecruitmentDrive drive) {
        RecruitmentDrive existingDrive = driveRepository.findById(driveId)
                .orElseThrow(() -> new RuntimeException("Drive not found"));
        
        if (!existingDrive.getRecruiter().getId().equals(recruiterId)) {
            throw new RuntimeException("Unauthorized access");
        }

        existingDrive.setCompanyName(drive.getCompanyName());
        existingDrive.setPosition(drive.getPosition());
        existingDrive.setDescription(drive.getDescription());
        existingDrive.setLocation(drive.getLocation());
        existingDrive.setSalary(drive.getSalary());
        existingDrive.setDeadline(drive.getDeadline());
        existingDrive.setRequirements(drive.getRequirements());
        existingDrive.setStatus(drive.getStatus());

        return driveRepository.save(existingDrive);
    }

    @Override
    public void deleteDrive(Long recruiterId, Long driveId) {
        RecruitmentDrive drive = driveRepository.findById(driveId)
                .orElseThrow(() -> new RuntimeException("Drive not found"));
        
        if (!drive.getRecruiter().getId().equals(recruiterId)) {
            throw new RuntimeException("Unauthorized access");
        }

        driveRepository.delete(drive);
    }

    @Override
    public List<Application> getDriveApplications(Long driveId) {
        RecruitmentDrive drive = driveRepository.findById(driveId)
                .orElseThrow(() -> new RuntimeException("Drive not found"));

//        if (!drive.getRecruiter().getId().equals(drive.getRecruiter().getId())) {
//            throw new RuntimeException("Unauthorized access");
//        }

        return drive.getApplications();
    }


    @Override
    public Application updateApplicationStatus(Long applicationId, ApplicationStatus status) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        application.setStatus(status);
        return applicationRepository.save(application);
    }

    @Override
    public RecruitmentDrive getDrive(Long driveId) {
        RecruitmentDrive drive = driveRepository.findById(driveId)
                .orElseThrow(() -> new RuntimeException("Drive not found"));
        return drive;
    }
}