package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/dapr/go-sdk/service/common"
	daprd "github.com/dapr/go-sdk/service/http"
)

var sub = &common.Subscription{
	PubsubName: "pubsub",
	Topic:      "second-topic",
	Route:      "/second-topic",
}

func main() {
	appPort := os.Getenv("APP_PORT")
	if appPort == "" {
		appPort = "8003"
	}

	s := daprd.NewService(":" + appPort)
	err := s.AddTopicEventHandler(sub, eventHandler)
	if err != nil {
		log.Fatalf("error adding topic subscription: %v", err)
	}

	err = s.Start()
	if err != nil && err != http.ErrServerClosed {
		log.Fatalf("error listenning: %v", err)
	}
}

func eventHandler(ctx context.Context, e *common.TopicEvent) (retry bool, err error) {
	fmt.Println("Subscriber received:", e.Data)
	return false, nil
}
