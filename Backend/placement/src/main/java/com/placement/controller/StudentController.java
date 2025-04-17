package com.placement.controller;

import com.placement.entity.RecruitmentDrive;
import com.placement.entity.Student;
import com.placement.entity.Application;
import com.placement.service.RecruiterService;
import com.placement.service.impl.StudentServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentServiceImpl studentService;
    @Autowired
    private RecruiterService recruiterService;

    @PostMapping("/register")
    public String registration(@RequestBody Student student){
        String result = studentService.registerStudent(student);
        return result;
    }

    @GetMapping("/verify-email")
    public String verifyEmail(@RequestParam String token){
        if(studentService.verifyEmail(token)){
            return "Email verified successfully";
        }
        return "Invalid Token or email not verified";
    }
    @GetMapping("/login")
    public Student login(@RequestParam String email, @RequestParam String password){

        Student student = studentService.login(email, password);
        if(student.getIsVerified()) {
            return student;
        }
        return new Student();
    }
    @GetMapping("/recruitment-drives")
    public ResponseEntity<List<RecruitmentDrive>> getRecruitmentDrives() {
        // In a real application, you would get the recruiter ID from the authenticated user
        return ResponseEntity.ok(studentService.getRecruitmentDrives());
    }


    @GetMapping("/{studentId}")
    public ResponseEntity<?> getDetails(@PathVariable Long studentId){
        return ResponseEntity.ok(studentService.getDetails(studentId));
    }


    @PutMapping("/profile")
    public ResponseEntity<Student> updateStudentProfile(@RequestBody Student student){
        return ResponseEntity.ok(studentService.updateStudentProfile(student));
    }

    @GetMapping("/applications")
    public ResponseEntity<List<Application>> getStudentApplications() {
        // In a real application, you would get the student ID from the authenticated user
        Long studentId = 1L; // This should come from the authentication context
        return ResponseEntity.ok(studentService.getStudentApplications(studentId));
    }
}
