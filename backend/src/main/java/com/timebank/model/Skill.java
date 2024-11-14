package com.timebank.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "skills")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Skill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String category;

    private String description;

    private LocalDateTime createdAt;

    @ManyToMany(mappedBy = "skills")
    private Set<User> users = new HashSet<>();

    @OneToMany(mappedBy = "skill")
    private Set<Request> requests = new HashSet<>();

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}