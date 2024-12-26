package database

import (
	"fmt"
	"os"
	"sync"
	"time"

	"github.com/labstack/gommon/log"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var (
	dbInstance *gorm.DB
	once       sync.Once
)

func GetDatabaseConnection() *gorm.DB {
	once.Do(func() {
		var err error
		host := os.Getenv("DB_HOST")
		user := os.Getenv("DB_USER")
		dbname := os.Getenv("DB_NAME")
		password := os.Getenv("DB_PASSWORD")

		// Corrected DSN with valid PostgreSQL parameters
		dsn := fmt.Sprintf(
			"host=%s user=%s dbname=%s password=%s sslmode=disable "+
				"connect_timeout=10",
			host, user, dbname, password,
		)

		// Configure GORM with better defaults
		gormConfig := &gorm.Config{
			PrepareStmt: true, // Cache prepared statements
			Logger: logger.New(
				log.New("database"),
				logger.Config{
					SlowThreshold:             time.Second,
					LogLevel:                  logger.Error,
					IgnoreRecordNotFoundError: true,
					Colorful:                  false,
				},
			),
		}

		dbInstance, err = gorm.Open(postgres.Open(dsn), gormConfig)
		if err != nil {
			log.Errorf("failed to connect database: %v", err)
			panic("failed to connect database")
		}

		// Get underlying SQL DB to configure pool
		sqlDB, err := dbInstance.DB()
		if err != nil {
			log.Errorf("failed to get database instance: %v", err)
			panic("failed to get database instance")
		}

		// Configure connection pool
		sqlDB.SetMaxIdleConns(2)
		sqlDB.SetMaxOpenConns(5)
		sqlDB.SetConnMaxLifetime(5 * time.Minute)
		sqlDB.SetConnMaxIdleTime(3 * time.Minute)
	})

	return dbInstance
}
