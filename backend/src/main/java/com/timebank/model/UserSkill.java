package com.timebank.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "user_skills")
public class UserSkill {
    @EmbeddedId
    private UserSkillId id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @MapsId("skillId")
    @JoinColumn(name = "skill_id")
    private Skill skill;

    private String proficiencyLevel;

    private Boolean verified = false;
}