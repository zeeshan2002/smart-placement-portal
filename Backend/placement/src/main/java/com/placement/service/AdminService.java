package com.placement.service;

import com.placement.entity.Admin;
import com.placement.entity.Recruiter;
import com.placement.entity.Student;
import java.util.List;
import java.util.Map;

public interface AdminService {
    Admin registerAdmin(Admin admin);
    Admin login(String email, String password);
    List<Recruiter> getPendingRecruiters();
    Recruiter approveRecruiter(Long recruiterId);
    Recruiter rejectRecruiter(Long recruiterId);
    List<Student> getAllStudents();
    List<Recruiter> getAllRecruiters();
    Student deactivateStudent(Long studentId);
    Recruiter deactivateRecruiter(Long recruiterId, String status);

    Map<String, Object> getPlacementAnalytics();
}
