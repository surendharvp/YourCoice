package com.timebank.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class RequestDTO {
    private Long id;
    private String title;
    private String description;
    private Integer estimatedHours;
    private String status;
    private LocalDateTime createdAt;
    private UserDTO user;
    private List<BidDTO> bids;
}