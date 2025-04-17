package com.placement.repository;

import com.placement.entity.Recruiter;
import com.placement.enums.RecruiterStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional; 
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RecruiterRepository extends JpaRepository<Recruiter, Long> {
    Optional<Recruiter> findByEmail(String email);
    boolean existsByEmail(String email);
    List<Recruiter> findByStatus(RecruiterStatus status);
    Optional<Recruiter> findByVerificationToken(String token);
    @Query("SELECT r FROM Recruiter r WHERE r.email = :email AND r.password = :password")
    Optional<Recruiter> findByEmailAndPassword(@Param("email") String email, @Param("password") String password);
    Long countByStatus(RecruiterStatus status);
}