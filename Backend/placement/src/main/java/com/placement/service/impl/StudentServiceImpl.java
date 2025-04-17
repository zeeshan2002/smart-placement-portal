package com.placement.service.impl;

import com.placement.entity.RecruitmentDrive;
import com.placement.entity.Student;
import com.placement.entity.Application;
import com.placement.repository.RecruitmentDriveRepository;
import com.placement.repository.StudentRepository;
import com.placement.repository.ApplicationRepository;
import com.placement.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.placement.service.EmailService;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private ApplicationRepository applicationRepository;
    @Autowired
    private RecruitmentDriveRepository driveRepository;

    private final String UPLOAD_DIR = "uploads/resumes/";

    @Autowired
    private EmailService emailService;

    public String registerStudent(Student student){
        if(studentRepository.existsByEmail(student.getEmail())){
            return "Email already exist";
        }
        String token = UUID.randomUUID().toString();
        student.setIsVerified(false);
        student.setVerificationToken(token);
        studentRepository.save(student);
        String verificationLink = "http://localhost:8080/api/students/verify-email?token="+token;
        emailService.sendVerificationEmail(student.getEmail(), verificationLink);
        return "registration successfully, check your email";
    }

    public boolean verifyEmail(String token){
        Student student = studentRepository.findByVerificationToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid Token"));
        student.setIsVerified(true);
        student.setVerificationToken(null);
        studentRepository.save(student);
        return true;
    }

    public Student login(String email, String password){
        Student student = studentRepository.findByEmailAndPassword(email, password)
                .orElseThrow(() -> new RuntimeException("Invalid Email id or password"));
//        Student student2 = studentRepo.findByPassword(password)
//                .orElseThrow(() -> new RuntimeException("Invalid Password"));
//        if(student.equals(student2))
//        if(student.getIsVerified()){
        return student;
//        }
//        return false;
    }


    @Override
    public List<RecruitmentDrive> getRecruitmentDrives() {
        return driveRepository.findAll();
    }

    @Override
    public Student getDetails(Long studentId){
        return studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Something went wrong"));
    }

    @Override
    public Student getStudentProfile(Long studentId) {
        return studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }

    @Override
    public Student updateStudentProfile(Student student) {
        Student existingStudent = studentRepository.findById(student.getId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        // Update basic information
        existingStudent.setName(student.getName());
        existingStudent.setEmail(student.getEmail());
        existingStudent.setPhone(student.getPhone());
        existingStudent.setDepartment(student.getDepartment());
        existingStudent.setEnrollmentNo(student.getEnrollmentNo());
        existingStudent.setDob(student.getDob());
        existingStudent.setCgpa(student.getCgpa());
        if(student.getPassword() != ""){
            existingStudent.setPassword(student.getPassword());
        }

        return studentRepository.save(existingStudent);
    }

    @Override
    public List<Application> getStudentApplications(Long studentId) {
        return applicationRepository.findByStudentId(studentId);
    }
} 