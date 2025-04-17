package com.placement.repository;

import com.placement.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByVerificationToken(String token);
    @Query("SELECT s FROM Student s WHERE s.email = :email AND s.password = :password")
    Optional<Student> findByEmailAndPassword(@Param("email") String email, @Param("password") String password);
    boolean existsByEmail(String email);
} 