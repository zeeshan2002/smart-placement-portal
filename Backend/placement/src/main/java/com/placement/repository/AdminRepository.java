package com.placement.repository;

import com.placement.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Optional;
// import org.springframework.data.jpa.repository.Query;
// import org.springframework.data.repository.query.Param;
@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> findByEmail(String email);
    Optional<Admin> findByEmailAndPassword(String email, String password);
    boolean existsByEmail(String email);
    // @Query("SELECT a FROM Admin a WHERE a.email = :email AND a.password = :password")
    // Optional<Admin> findByEmailAndPassword(@Param("email") String email, @Param("password") String password);
} 