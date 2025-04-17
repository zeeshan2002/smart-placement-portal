package com.placement.service;

import com.placement.entity.RecruitmentDrive;
import com.placement.entity.Student;
import com.placement.entity.Application;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

public interface StudentService {
    Student getStudentProfile(Long studentId);
    Student updateStudentProfile(Student student);
    List<Application> getStudentApplications(Long studentId);
    String registerStudent(Student student);
    boolean verifyEmail(String token);
    Student login(String email, String password);
    Student getDetails(Long studentId);
    List<RecruitmentDrive> getRecruitmentDrives();
} 