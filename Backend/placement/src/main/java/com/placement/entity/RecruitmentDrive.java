package com.placement.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;
import com.placement.enums.DriveStatus;

@Entity
@Table(name = "recruitment_drives")
@Data
public class RecruitmentDrive {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String companyName;

    @Column(nullable = false)
    private String position;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private Double salary;

    @Column(nullable = false)
    private LocalDateTime deadline;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private DriveStatus status;

    @ElementCollection
    @CollectionTable(name = "drive_requirements", joinColumns = @JoinColumn(name = "drive_id"))
    @Column(name = "requirement")
    private List<String> requirements;

    @ManyToOne
    @JoinColumn(name = "recruiter_id", nullable = false)
    @JsonIgnore
    private Recruiter recruiter;

    @OneToMany(mappedBy = "drive", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Application> applications;

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

