package main

import (
	"log"

	wschat "github.com/wbydc/go-wschat/backend/pkg/wschat"
)

func main() {
	wschatServer, err := wschat.NewServer()
	if err != nil {
		log.Fatal(err)
	}

	if err := wschatServer.Run(); err != nil {
		log.Fatal(err)
	}
}
