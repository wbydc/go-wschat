package wschat

import (
	config "github.com/wbydc/go-wschat/backend/internal/wschat/config"
)

type App struct {
}

func NewApp() (*App, error) {
	cfg, _ := config.LoadConfig()
}