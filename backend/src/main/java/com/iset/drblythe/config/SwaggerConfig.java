package com.iset.drblythe.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class SwaggerConfig {

  @Bean
  public OpenAPI customOpenAPI() {
    return new OpenAPI().info(getInfo());
  }

  private Info getInfo() {
    return  new Info().title("Dr Blythe").description("LMP API");
  }
}
