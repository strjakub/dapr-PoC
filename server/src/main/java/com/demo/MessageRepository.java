package com.demo;

import io.dapr.client.DaprClient;
import io.dapr.client.domain.State;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class MessageRepository {

    private static final String STORE_NAME = "statestore";

    private final DaprClient daprClient;

    public MessageRepository(DaprClient daprClient) {
        this.daprClient = daprClient;
    }

    public int getLastMessageId() {
        return Optional.ofNullable(daprClient.getState(STORE_NAME, "lastMessage", Integer.class).block())
                .map(State::getValue).orElse(0);
    }

    public void saveLastMessageId(int id) {
        daprClient.saveState(STORE_NAME, "lastMessage", id).block();
    }
}
