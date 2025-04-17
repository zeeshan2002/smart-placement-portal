    package com.placement.controller;

    import com.placement.entity.Recruiter;
    import com.placement.entity.RecruitmentDrive;
    import com.placement.entity.Application;
    import com.placement.enums.ApplicationStatus;
    import com.placement.service.RecruiterService;
    import com.placement.service.impl.RecruiterServiceImpl;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;

    import java.util.List;

    @RestController
    @RequestMapping("/api/recruiters")
    @CrossOrigin(origins = "http://localhost:5173")
    public class RecruiterController {

        @Autowired
        private RecruiterServiceImpl recruiterService;

        @PostMapping("/register")
        public ResponseEntity<?> createRecruiter(@RequestBody Recruiter recruiter){
            return ResponseEntity.ok(recruiterService.createRecruiter(recruiter));
        }

        @GetMapping("/verify-email")
        public String verifyEmail(@RequestParam String token){
            if(recruiterService.verifyEmail(token)){
                return "Email verified successfully";
            }
            return "Invalid Token or email not verified";
        }
        @GetMapping("/login")
        public Recruiter recruiterLogin(@RequestParam String email, @RequestParam String password){
            return recruiterService.login(email, password);
        }

        @GetMapping("/profile/{recruiterId}")
        public ResponseEntity<Recruiter> getRecruiterProfile(@PathVariable Long recruiterId) {
            return ResponseEntity.ok(recruiterService.getRecruiterProfile(recruiterId));
        }

        @PutMapping("/profile")
        public ResponseEntity<Recruiter> updateRecruiterProfile(@RequestBody Recruiter recruiter) {
            return ResponseEntity.ok(recruiterService.updateRecruiterProfile(recruiter));
        }

        @GetMapping("/drives/{recruiterId}")
        public ResponseEntity<List<RecruitmentDrive>> getRecruiterDrives(@PathVariable Long recruiterId) {
            // In a real application, you would get the recruiter ID from the authenticated user
            return ResponseEntity.ok(recruiterService.getRecruiterDrives(recruiterId));
        }
        @GetMapping("/drive/{driveId}")
        public ResponseEntity<RecruitmentDrive> getDrive(@PathVariable Long driveId) {
            return ResponseEntity.ok(recruiterService.getDrive(driveId));
        }
        @GetMapping("/drives/{driveId}/applications")
        public ResponseEntity<List<Application>> getDriveApplications(@PathVariable Long driveId) {
            return ResponseEntity.ok(recruiterService.getDriveApplications(driveId));
        }

        @PostMapping("/drives/{recruiterId}")
        public ResponseEntity<RecruitmentDrive> createDrive(@PathVariable Long recruiterId, @RequestBody RecruitmentDrive drive) {
            // In a real application, you would get the recruiter ID from the authenticated user
            return ResponseEntity.ok(recruiterService.createDrive(recruiterId, drive));
        }

        @PutMapping("/drives/{recruiterId}/{driveId}")
        public ResponseEntity<RecruitmentDrive> updateDrive(
                @PathVariable Long recruiterId,
                @PathVariable Long driveId,
                @RequestBody RecruitmentDrive drive) {
            // In a real application, you would get the recruiter ID from the authenticated user
            return ResponseEntity.ok(recruiterService.updateDrive(recruiterId, driveId, drive));
        }

        @DeleteMapping("/drives/{recruiterId}/{driveId}")
        public ResponseEntity<Void> deleteDrive(@PathVariable Long recruiterId, @PathVariable Long driveId) {
            // In a real application, you would get the recruiter ID from the authenticated user
            recruiterService.deleteDrive(recruiterId, driveId);
            return ResponseEntity.ok().build();
        }

        @PutMapping("/applications/{applicationId}")
        public ResponseEntity<Application> updateApplicationStatus(
                @PathVariable Long applicationId,
                @RequestParam ApplicationStatus status) {
            return ResponseEntity.ok(recruiterService.updateApplicationStatus(applicationId, status));
        }
    }
