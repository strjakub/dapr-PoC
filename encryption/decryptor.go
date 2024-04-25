package main

import (
	"context"
	"fmt"
	"os"
	"io"
	"encoding/base64"
	"bytes"
	"log"

	"github.com/dapr/go-sdk/service/common"
	dapr "github.com/dapr/go-sdk/client"
	daprd "github.com/dapr/go-sdk/service/http"
)

const (
	CryptoComponentName = "localstorage"
	RSAKeyName = "rsa-private-key.pem"
)

var sub = &common.Subscription{
	PubsubName: "pubsub",
	Topic:      "go-topic",
	Route:      "/go-topic",
}

func main() {
	appPort := os.Getenv("APP_PORT")
	if appPort == "" {
		appPort = "8004"
	}

	service := daprd.NewService(":" + appPort)
	service.AddTopicEventHandler(sub, eventHandler)
	service.Start()
}

func eventHandler(ctx context.Context, e *common.TopicEvent) (retry bool, err error) {
	fmt.Println("Subscriber received data to decrypt")

	client, _ := dapr.NewClient()

	dataString, ok := e.Data.(string)
	if !ok {
		log.Fatalf("unexpected data type: %T", e.Data)
	}

	encryptedData, err := base64.StdEncoding.DecodeString(dataString)
	if err != nil {
		log.Fatalf("error decoding base64 data: %v", err)
	}

	decStream, err := client.Decrypt(context.Background(), bytes.NewReader(encryptedData), dapr.DecryptOptions{
		ComponentName: CryptoComponentName,
	})
	if err != nil {
		log.Fatalf("error while decrypting: %v", err)
	}

	decBytes, err := io.ReadAll(decStream)
	if err != nil {
		log.Fatalf("error while reading stream: %v", err)
	}

	fmt.Println("Decrypted data:", string(decBytes))
	return false, nil
}
