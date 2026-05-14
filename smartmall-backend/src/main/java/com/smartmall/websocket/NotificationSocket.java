package com.smartmall.websocket;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.Map;

@Controller
public class NotificationSocket {

	@MessageMapping("/notifications.broadcast")
	@SendTo("/topic/notifications")
	public Map<String, Object> broadcast(@Payload Map<String, Object> payload) {
		return payload;
	}
}
