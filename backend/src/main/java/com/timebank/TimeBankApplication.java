package com.timebank;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;

@SpringBootApplication
@EnableCaching
@EnableAsync
@EnableScheduling
@OpenAPIDefinition(
    info = @Info(
        title = "TimeBank API",
        version = "1.0",
        description = "API documentation for the TimeBank service exchange platform"
    )
)
public class TimeBankApplication {
    public static void main(String[] args) {
        SpringApplication.run(TimeBankApplication.class, args);
    }
}