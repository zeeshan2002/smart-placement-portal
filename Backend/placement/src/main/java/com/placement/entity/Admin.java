package com.placement.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
// import com.placement.enums.AdminRecruiter;
@Entity
@Table(name = "admins")
@Data
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    // @Column(nullable = false)
    // private boolean emailVerified;

    // @Column(nullable = false)
    // private String verificationToken;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    // @Column(nullable = false)
    // @Enumerated(EnumType.STRING)
    // private AdminRecruiter status;

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