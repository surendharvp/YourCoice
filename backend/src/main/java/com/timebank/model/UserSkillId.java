package com.timebank.model;

import jakarta.persistence.Embeddable;
import lombok.Data;

import java.io.Serializable;

@Data
@Embeddable
public class UserSkillId implements Serializable {
    private Long userId;
    private Long skillId;
}