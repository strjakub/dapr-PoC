package com.demo;

import io.dapr.client.DaprClient;
import io.dapr.client.domain.State;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
class FeedRepository {

    private static final String STORE_NAME = "statestore";

    private final DaprClient daprClient;

    FeedRepository(DaprClient daprClient) {
        this.daprClient = daprClient;
    }

    int getFeedValue(String dogName) {
        return Optional.ofNullable(daprClient.getState(STORE_NAME, dogName, Integer.class).block())
                .map(State::getValue).orElse(0);
    }

    void saveFeedValue(String dogName, int feedQuantity) {
        daprClient.saveState(STORE_NAME, dogName, getFeedValue(dogName) + feedQuantity).block();
    }
}
