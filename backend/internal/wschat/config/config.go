package config

import (
	"log"
	"os"

	"github.com/kelseyhightower/envconfig"
	"gopkg.in/yaml.v2"
)

type Config struct {
	Server struct {
		Port      string `yaml:"port", envconfig:"SERVER_PORT" default:"3000"`
		JWTSecret string `yaml:"jwt_secret", envconfig:"JWT_SECRET" default:"jwt_secret"`
	} `yaml:"server"`
}

func LoadConfig() (*Config, error) {
	cfg := &Config{}
	readFile(cfg)
	readEnv(cfg)
	return cfg, nil
}

func processError(err error) {
	log.Fatal(err)
	os.Exit(2)
}

func readFile(cfg *Config) {
	f, err := os.Open("config.yml")
	if err != nil {
		processError(err)
	}
	defer f.Close()

	decoder := yaml.NewDecoder(f)
	err = decoder.Decode(cfg)
	if err != nil {
		processError(err)
	}
}

func readEnv(cfg *Config) {
	err := envconfig.Process("", cfg)
	if err != nil {
		processError(err)
	}
}
