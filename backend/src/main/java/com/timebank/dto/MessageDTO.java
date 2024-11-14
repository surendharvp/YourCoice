package com.timebank.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class MessageDTO {
    private Long id;
    private String content;
    private Long senderId;
    private Long recipientId;
    private LocalDateTime timestamp;
}