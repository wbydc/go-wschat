package main

import (
	"log"

	"github.com/wbydc/go-wschat/backend/internal/wschat"
)

func main() {
	wschatServer, err := wschat.NewApp()
	if err != nil {
		log.Fatal(err)
	}

	if err := wschatServer.Run(); err != nil {
		log.Fatal(err)
	}
}
