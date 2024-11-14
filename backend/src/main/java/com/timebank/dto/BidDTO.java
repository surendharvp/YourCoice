package com.timebank.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class BidDTO {
    private Long id;
    private Integer amount;
    private String message;
    private String status;
    private LocalDateTime createdAt;
    private UserDTO provider;
}