package handler

import (
	"time"

	"github.com/keyglee/assessment/lib/database"
	"github.com/keyglee/assessment/lib/logger"
	"github.com/keyglee/assessment/lib/todo/model"
	"github.com/keyglee/assessment/lib/todo/repository"
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

type Handler struct {
	TodoRepository *repository.TodoRepository
	logger         *logrus.Logger
}

func initializeDBForInterview(db *gorm.DB) {
	err := db.AutoMigrate(&model.Todo{})
	if err != nil {
		panic(err)
	}

	repo := repository.NewTodoRepository(db)

	todos, _ := repo.Search(&model.TodoSearchParams{})
	if len(todos) > 0 {
		return
	}

	repo.Create(&model.Todo{
		DisplayName: "Buy Milk",
		DueBy:       time.Date(2024, time.December, 15, 23, 59, 59, 0, time.UTC),
	})

	repo.Create(&model.Todo{
		DisplayName: "Call the Water Company",
		DueBy:       time.Date(2025, time.December, 31, 23, 59, 59, 0, time.UTC),
	})
}

func NewHandler() *Handler {
	db := database.GetDatabaseConnection()

	initializeDBForInterview(db)

	return &Handler{
		TodoRepository: repository.NewTodoRepository(db),
		logger:         logger.NewLogger(),
	}
}
