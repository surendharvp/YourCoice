package com.timebank.service;

import com.timebank.dto.MessageDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WebSocketService {

    private final SimpMessagingTemplate messagingTemplate;

    public void sendPrivateMessage(String userId, MessageDTO message) {
        messagingTemplate.convertAndSendToUser(
            userId,
            "/queue/messages",
            message
        );
    }

    public void sendNotification(String userId, String notification) {
        messagingTemplate.convertAndSendToUser(
            userId,
            "/queue/notifications",
            notification
        );
    }

    public void broadcastRequestUpdate(String requestId, Object update) {
        messagingTemplate.convertAndSend(
            "/topic/requests/" + requestId,
            update
        );
    }
}