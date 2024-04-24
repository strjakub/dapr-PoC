package com.demo;

import io.dapr.client.DaprClient;
import io.dapr.client.domain.Metadata;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.Random;

import static java.util.Collections.singletonMap;

@RestController
public class Controller {

    private static final Logger logger = LoggerFactory.getLogger(Controller.class);
    private static final String MESSAGE_TTL_IN_SECONDS = "1000";
    private static final String TOPIC_NAME = "common-topic";
    private static final String PUBSUB_NAME = "pubsub";
    private final DaprClient client;

    private final MessageRepository messageRepository;

    public Controller(DaprClient client, MessageRepository messageRepository) {
        this.client = client;
        this.messageRepository = messageRepository;
    }

    @GetMapping("/health")
    @ResponseStatus(code = HttpStatus.OK)
    public String health() {
        logger.debug("-- healthy --");
        return "healthy";
    }

    @GetMapping("/generatedId")
    public int generatedId() {
        Random random = new Random();
        int id = random.nextInt(999) + 1;
        client.publishEvent(
                PUBSUB_NAME,
                TOPIC_NAME,
                id,
                singletonMap(Metadata.TTL_IN_SECONDS, MESSAGE_TTL_IN_SECONDS)).block();
        logger.info("PubSub message sent: " + id);
        messageRepository.saveLastMessageId(id);
        return id;
    }

    @GetMapping("/last")
    @ResponseStatus(code = HttpStatus.OK)
    public int last() {
        return messageRepository.getLastMessageId();
    }
}
