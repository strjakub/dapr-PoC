package main

import (
	"context"
	"fmt"
	"strings"
	"os"
	"io"

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

	s := daprd.NewService(":" + appPort)
	s.AddTopicEventHandler(sub, eventHandler)
	s.Start()
}

func eventHandler(ctx context.Context, e *common.TopicEvent) (retry bool, err error) {
	fmt.Println("Subscriber received data to decrypt")
	
	client, _ := dapr.NewClient()

	dataString, _ := e.Data.(string)
	//data := []byte(dataString)

	decStream, err := client.Decrypt(context.Background(),
	strings.NewReader(dataString),
	dapr.DecryptOptions{
	ComponentName: CryptoComponentName,
	KeyName: RSAKeyName,
	},)
	if err != nil {
		fmt.Println("error while decrypting: %v", err)
	}

	decBytes, err := io.ReadAll(decStream)
	if err != nil {
		fmt.Println("error while reading stream: %v", err)
	}

	fmt.Printf("Decrypted the message, got %d bytes\n", len(decBytes))
	fmt.Println(string(decBytes))
	return false, nil
}