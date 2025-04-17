package com.placement.controller;

import com.placement.entity.Admin;
import com.placement.entity.Recruiter;
import com.placement.entity.Student;
import com.placement.entity.Application;
import com.placement.enums.RecruiterStatus;
import com.placement.service.AdminService;
import com.placement.service.impl.AdminServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    @Autowired
    private AdminServiceImpl adminService;

    @PostMapping("/register")
    public ResponseEntity<?> registerAdmin(@RequestBody Admin admin) {
        return ResponseEntity.ok(adminService.registerAdmin(admin));
    }

    // @GetMapping("/verify-email")
    // public String verifyEmail(@RequestParam String token){
    //     if(adminService.verifyEmail(token)){
    //         return "Email verified successfully";
    //     }
    //     return "Invalid Token or email not verified";
    // }


    @GetMapping("/login")
    public ResponseEntity<Admin> login(@RequestParam String email, @RequestParam String password) {
        return ResponseEntity.ok(adminService.login(email, password));
    }

    @GetMapping("/recruiters/pending")
    public ResponseEntity<List<Recruiter>> getPendingRecruiters() {
        List<Recruiter> pendingRecruiters = adminService.getPendingRecruiters();
        return ResponseEntity.ok(pendingRecruiters);
    }

    @PutMapping("/recruiters/{recruiterId}/approve")
    public ResponseEntity<?> approveRecruiter(@PathVariable Long recruiterId) {
        try {
            Recruiter approvedRecruiter = adminService.approveRecruiter(recruiterId);
            return ResponseEntity.ok(approvedRecruiter);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/recruiters/{recruiterId}/reject")
    public ResponseEntity<?> rejectRecruiter(@PathVariable Long recruiterId) {
        try {
            Recruiter rejectedRecruiter = adminService.rejectRecruiter(recruiterId);
            return ResponseEntity.ok(rejectedRecruiter);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/students")
    public ResponseEntity<List<Student>> getAllStudents() {
        List<Student> students = adminService.getAllStudents();
        return ResponseEntity.ok(students);
    }

    @GetMapping("/recruiters")
    public ResponseEntity<List<Recruiter>> getAllRecruiters() {
        List<Recruiter> recruiters = adminService.getAllRecruiters();
        return ResponseEntity.ok(recruiters);
    }

//    @PutMapping("/students/{studentId}/deactivate")
//    public ResponseEntity<?> deactivateStudent(@PathVariable Long studentId) {
//        try {
//            Student deactivatedStudent = adminService.deactivateStudent(studentId);
//            return ResponseEntity.ok(deactivatedStudent);
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }

    @PutMapping("/recruiters/{recruiterId}/{status}")
    public ResponseEntity<?> deactivateRecruiter(@PathVariable Long recruiterId, @PathVariable String status) {
        try {
            Recruiter deactivatedRecruiter = adminService.deactivateRecruiter(recruiterId, status);
            return ResponseEntity.ok(deactivatedRecruiter);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/analytics")
    public ResponseEntity<?> getPlacementAnalytics() {
        try {
            return ResponseEntity.ok(adminService.getPlacementAnalytics());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
