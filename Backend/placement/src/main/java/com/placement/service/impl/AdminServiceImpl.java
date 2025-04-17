package com.placement.service.impl;

import com.placement.entity.Admin;
import com.placement.entity.Recruiter;
import com.placement.entity.Student;
import com.placement.enums.ApplicationStatus;
import com.placement.enums.RecruiterStatus;
import com.placement.repository.AdminRepository;
import com.placement.repository.RecruiterRepository;
import com.placement.repository.StudentRepository;
import com.placement.repository.ApplicationRepository;
import com.placement.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private RecruiterRepository recruiterRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    // @Autowired
    // private EmailService emailService;

    @Override
    public Admin registerAdmin(Admin admin) {
        if (adminRepository.findByEmail(admin.getEmail()).isPresent()) {
            throw new RuntimeException("Admin with this email already exists");
        }
        return adminRepository.save(admin);
    }

    @Override
    public Admin login(String email, String password) {
        Optional<Admin> admin = adminRepository.findByEmailAndPassword(email, password);
        if (admin.isEmpty()) {
            throw new RuntimeException("Invalid email or password");
        }
        return admin.get();
    }

    @Override
    public List<Recruiter> getPendingRecruiters() {
        return recruiterRepository.findByStatus(RecruiterStatus.PENDING);
    }

    @Override
    public Recruiter approveRecruiter(Long recruiterId) {
        Recruiter recruiter = recruiterRepository.findById(recruiterId)
            .orElseThrow(() -> new RuntimeException("Recruiter not found"));
        recruiter.setStatus(RecruiterStatus.APPROVED);
        return recruiterRepository.save(recruiter);
    }

    @Override
    public Recruiter rejectRecruiter(Long recruiterId) {
        Recruiter recruiter = recruiterRepository.findById(recruiterId)
            .orElseThrow(() -> new RuntimeException("Recruiter not found"));
        recruiter.setStatus(RecruiterStatus.REJECTED);

        return recruiterRepository.save(recruiter);
    }

    @Override
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @Override
    public List<Recruiter> getAllRecruiters() {
        return recruiterRepository.findAll();
    }

    @Override
    public Student deactivateStudent(Long studentId) {
        Student student = studentRepository.findById(studentId)
            .orElseThrow(() -> new RuntimeException("Student not found"));
        student.setIsVerified(false);
        return studentRepository.save(student);
    }

    @Override
    public Recruiter deactivateRecruiter(Long recruiterId, String status) {
        Recruiter recruiter = recruiterRepository.findById(recruiterId)
            .orElseThrow(() -> new RuntimeException("Recruiter not found"));
        recruiter.setStatus(RecruiterStatus.valueOf(status.toUpperCase()));
        return recruiterRepository.save(recruiter);
    }

    @Override
    public Map<String, Object> getPlacementAnalytics() {
        Map<String, Object> analytics = new HashMap<>();
        
        // Total students
        long totalStudents = studentRepository.count();
        analytics.put("totalStudents", totalStudents);
        
        // Total recruiters
        long totalRecruiters = recruiterRepository.count();
        analytics.put("totalRecruiters", totalRecruiters);
        
        // Total applications
        long totalApplications = applicationRepository.count();
        analytics.put("totalApplications", totalApplications);
        
        // Applications by status
        Map<String, Long> applicationsByStatus = new HashMap<>();
        applicationsByStatus.put("PENDING", applicationRepository.countByStatus(ApplicationStatus.PENDING));
        applicationsByStatus.put("SHORTLISTED", applicationRepository.countByStatus(ApplicationStatus.SHORTLISTED));
        applicationsByStatus.put("REJECTED", applicationRepository.countByStatus(ApplicationStatus.REJECTED));
        applicationsByStatus.put("SELECTED", applicationRepository.countByStatus(ApplicationStatus.SELECTED));
        analytics.put("applicationsByStatus", applicationsByStatus);
        
        // Recruiters by status
        Map<String, Long> recruitersByStatus = new HashMap<>();
        recruitersByStatus.put("PENDING", recruiterRepository.countByStatus(RecruiterStatus.PENDING));
        recruitersByStatus.put("APPROVED", recruiterRepository.countByStatus(RecruiterStatus.APPROVED));
        recruitersByStatus.put("REJECTED", recruiterRepository.countByStatus(RecruiterStatus.REJECTED));
        recruitersByStatus.put("DEACTIVATED", recruiterRepository.countByStatus(RecruiterStatus.DEACTIVATED));
        analytics.put("recruitersByStatus", recruitersByStatus);
        
        return analytics;
    }
} 