package com.smartmall.util;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

public final class QRCodeGenerator {

	private QRCodeGenerator() {
	}

	public static String generateAsBase64(String content) {
		if (content == null) {
			return "";
		}
		return Base64.getEncoder().encodeToString(content.getBytes(StandardCharsets.UTF_8));
	}
}
