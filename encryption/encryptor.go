package main

import (
	"context"
	"fmt"
	"log"
	"strings"
	"net/http"
	"os"
	"io"
	"encoding/base64"

	"github.com/dapr/go-sdk/service/common"
	dapr "github.com/dapr/go-sdk/client"
	daprd "github.com/dapr/go-sdk/service/http"
)

const (
	CryptoComponentName = "localstorage"
	RSAKeyName = "rsa-private-key.pem"
	pubsubComponentName = "pubsub"
	pubsubPublishTopic = "go-topic"
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
	client, _ := dapr.NewClient()
	encryptDecryptString(client)	
	return false, nil
}

func encryptDecryptString(client dapr.Client) {
	const message = "Dogs are very cute"


	encStream, err := client.Encrypt(context.Background(),
		strings.NewReader(message),
		dapr.EncryptOptions{
			ComponentName: CryptoComponentName,
			KeyName:          RSAKeyName,
			KeyWrapAlgorithm: "RSA",
		},
	)
	if err != nil {
		fmt.Println("error while encrypting: %v", err)
	}

	encBytes, err := io.ReadAll(encStream)
	if err != nil {
		fmt.Println("error while reading stream: %v", err)
	}
	

	base64EncodedData := encodeInBase64(encBytes)

	client.PublishEvent(context.Background(), pubsubComponentName, pubsubPublishTopic, base64EncodedData)	
}

func encodeInBase64(data []byte) string {
    return base64.StdEncoding.EncodeToString(data)
}
