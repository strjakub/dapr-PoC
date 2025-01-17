package com.demo;

import io.dapr.client.DaprClient;
import io.dapr.client.DaprClientBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DaprConfiguration {

    @Bean
    DaprClient daprClient() {
        return new DaprClientBuilder().build();
    }
}
