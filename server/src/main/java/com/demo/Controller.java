package com.demo;

import io.dapr.client.DaprClient;
import io.dapr.client.domain.Metadata;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Random;

import static java.util.Collections.singletonMap;

@RestController
public class Controller {

    private static final Logger logger = LoggerFactory.getLogger(Controller.class);
    private static final String MESSAGE_TTL_IN_SECONDS = "1000";
    private static final String TOPIC_NAME = "common-topic";
    private static final String PUBSUB_NAME = "pubsub";
    private static final Random random = new Random();
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

    @GetMapping("/id")
    public int id() {
        int id = random.nextInt(999) + 1;
        publishMessage(String.valueOf(id), TOPIC_NAME);
        messageRepository.saveLastMessageId(id);
        return id;
    }

    @GetMapping("/last")
    @ResponseStatus(code = HttpStatus.OK)
    public int last() {
        return messageRepository.getLastMessageId();
    }

    @PostMapping("/feed")
    public void feed(@RequestBody FeedRequest feedRequest) {
        //TODO Marcel add sth about this to state store (and endpoint to retrieve it - with button)
        publishMessage(feedRequest.dogName() + ":" + feedRequest.feedQuantity(), TOPIC_NAME);
    }

    private void publishMessage(String message, String topic) {
        client.publishEvent(
                PUBSUB_NAME,
                topic,
                message,
                singletonMap(Metadata.TTL_IN_SECONDS, MESSAGE_TTL_IN_SECONDS)).block();
        logger.info("PubSub message sent: {} to the topic: {}", message, topic);
    }
}
