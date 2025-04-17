package com.placement.controller;

import com.placement.entity.Application;
import com.placement.service.impl.ApplicationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:5173")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @PostMapping("/{studentId}/apply/{driveId}")
    public ResponseEntity<?> applyToDrive(@PathVariable Long studentId, @PathVariable Long driveId) {
        try {
            Application application = applicationService.applyToDrive(studentId, driveId);
            return ResponseEntity.ok(application);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{studentId}/applications")
    public ResponseEntity<List<Application>> getStudentApplications(@PathVariable Long studentId) {
        List<Application> applications = applicationService.getApplicationsByStudentId(studentId);
        return ResponseEntity.ok(applications);
    }

    @GetMapping("/drives/{driveId}/applications")
    public ResponseEntity<List<Application>> getDriveApplications(@PathVariable Long driveId) {
        List<Application> applications = applicationService.getApplicationsByDriveId(driveId);
        System.out.println(applications);
        return ResponseEntity.ok(applications);
    }

    @PutMapping("/applications/{applicationId}/status")
    public ResponseEntity<?> updateApplicationStatus(
            @PathVariable Long applicationId,
            @RequestParam String status) {
        try {
            Application application = applicationService.updateApplicationStatus(applicationId, status);
            return ResponseEntity.ok(application);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
} 