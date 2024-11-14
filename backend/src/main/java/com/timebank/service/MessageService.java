package com.timebank.service;

import com.timebank.dto.MessageDTO;
import com.timebank.model.User;
import com.timebank.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MessageService {
    private final WebSocketService webSocketService;
    private final UserRepository userRepository;

    public void processAndSendMessage(String senderId, MessageDTO message) {
        // Validate users exist
        User sender = userRepository.findById(Long.parseLong(senderId))
            .orElseThrow(() -> new RuntimeException("Sender not found"));
        
        User recipient = userRepository.findById(message.getRecipientId())
            .orElseThrow(() -> new RuntimeException("Recipient not found"));

        // Send the message
        webSocketService.sendPrivateMessage(
            recipient.getId().toString(),
            message
        );
    }

    public void sendTypingNotification(String senderId, String recipientId) {
        webSocketService.sendPrivateMessage(
            recipientId,
            createTypingNotification(senderId)
        );
    }

    private MessageDTO createTypingNotification(String userId) {
        MessageDTO notification = new MessageDTO();
        notification.setSenderId(Long.parseLong(userId));
        notification.setContent("TYPING");
        return notification;
    }
}