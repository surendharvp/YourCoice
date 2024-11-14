package com.timebank.controller;

import com.timebank.dto.MessageDTO;
import com.timebank.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;

    @MessageMapping("/chat.send")
    public void sendMessage(@Payload MessageDTO message, SimpMessageHeaderAccessor headerAccessor) {
        String senderId = headerAccessor.getSessionAttributes().get("userId").toString();
        messageService.processAndSendMessage(senderId, message);
    }

    @MessageMapping("/chat.typing")
    public void typingNotification(@Payload String userId, SimpMessageHeaderAccessor headerAccessor) {
        String senderId = headerAccessor.getSessionAttributes().get("userId").toString();
        messageService.sendTypingNotification(senderId, userId);
    }
}