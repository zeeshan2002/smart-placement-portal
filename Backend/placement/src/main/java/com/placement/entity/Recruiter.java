package com.placement.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;
import com.placement.enums.RecruiterStatus;
@Entity
@Table(name = "recruiters")
@Data
public class Recruiter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String companyName;

    @Column
    private String designation;

    @Column(nullable = false)
    private String phone;

    @Column
    private String verificationToken;

    @Column(nullable = false)
    private Boolean emailVerified;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private RecruiterStatus status;

    @OneToMany(mappedBy = "recruiter", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<RecruitmentDrive> drives;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}

