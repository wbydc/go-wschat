package database

import (
	"database/sql"

	_ "github.com/lib/pq"
	"github.com/wbydc/go-wschat/backend/internal/wschat/config"
)

func NewDatabase(config *config.Config) (*sql.DB, error) {
	db, err := sql.Open("postgres", config.Database.ConnectionString)

	if err != nil {
		return nil, err
	}

	return db, nil
}
