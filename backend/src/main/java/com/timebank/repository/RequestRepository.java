package com.timebank.repository;

import com.timebank.model.Request;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RequestRepository extends JpaRepository<Request, Long> {
    Page<Request> findByStatusOrderByCreatedAtDesc(String status, Pageable pageable);
    
    List<Request> findByUserIdOrderByCreatedAtDesc(Long userId);
    
    @Query("SELECT r FROM Request r WHERE " +
           "LOWER(r.title) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(r.description) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Request> findByTitleContainingOrDescriptionContaining(@Param("query") String query);
    
    @Query("SELECT r FROM Request r WHERE r.status = :status " +
           "AND r.estimatedHours BETWEEN :minHours AND :maxHours")
    Page<Request> findByStatusAndHourRange(
        @Param("status") String status,
        @Param("minHours") Integer minHours,
        @Param("maxHours") Integer maxHours,
        Pageable pageable
    );
}