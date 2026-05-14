package com.smartmall.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class EmailUtil {

	private static final Logger log = LoggerFactory.getLogger(EmailUtil.class);

	public void send(String to, String subject, String body) {
		log.info("Simulated email sent to={} subject={} bodyLength={}", to, subject, body != null ? body.length() : 0);
	}
}
