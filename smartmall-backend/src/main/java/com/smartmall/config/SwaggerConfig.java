package com.smartmall.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class SwaggerConfig {

	@Bean
	public OpenAPI smartMallOpenApi() {
		return new OpenAPI()
				.info(new Info()
						.title("SmartMallX API")
						.description("Production-style REST API for SmartMallX backend")
						.version("v1")
						.contact(new Contact().name("SmartMallX Team")));
	}
}
