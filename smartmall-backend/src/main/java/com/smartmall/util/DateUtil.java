package com.smartmall.util;

import java.time.Instant;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;

public final class DateUtil {

	private static final DateTimeFormatter ISO_FORMATTER = DateTimeFormatter.ISO_OFFSET_DATE_TIME;

	private DateUtil() {
	}

	public static String toIso(Instant instant) {
		if (instant == null) {
			return null;
		}
		return ISO_FORMATTER.format(instant.atOffset(ZoneOffset.UTC));
	}
}
