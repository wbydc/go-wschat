package config

import (
	"os"

	"github.com/kelseyhightower/envconfig"
	"gopkg.in/yaml.v2"
)

type Config struct {
	Server struct {
		Port      string `yaml:"port", envconfig:"SERVER_PORT" default:"3000"`
		JWTSecret string `yaml:"jwt_secret", envconfig:"JWT_SECRET" default:"jwt_secret"`
	} `yaml:"server"`
	Database struct {
		ConnectionString string `yaml:"connection_string", envconfig:"DB_CONNECTION"`
	} `yaml:"database"`
}

func LoadConfig() (*Config, error) {
	cfg := &Config{}

	if err := readFile(cfg); err != nil {
		return nil, err
	}
	if err := readEnv(cfg); err != nil {
		return nil, err
	}

	return cfg, nil
}

func readFile(cfg *Config) error {
	f, err := os.Open("config.yml")
	if err != nil {
		return err
	}
	defer f.Close()

	decoder := yaml.NewDecoder(f)
	err = decoder.Decode(cfg)
	return err
}

func readEnv(cfg *Config) error {
	err := envconfig.Process("", cfg)
	return err
}
