package handler

import (
	"time"

	"github.com/keyglee/assessment/lib/todo/model"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

type GetTodoRequest struct {
	ID uint `param:"id"`
}

func (h *Handler) GetTodo(c echo.Context) error {

	req := GetTodoRequest{}
	if err := c.Bind(&req); err != nil {
		return c.JSON(400, "Invalid request.")
	}

	todo, err := h.TodoRepository.GetByID(req.ID)
	if err == gorm.ErrRecordNotFound {
		return c.JSON(404, "Todo not found.")
	}
	if err != nil {
		h.logger.Errorf("Error getting todo: %v", err)
		return c.JSON(500, "Internal server error.")
	}

	return c.JSON(200, todo)
}

type SearchTodosRequest struct {
	ID          *uint   `query:"id"`
	DisplayName *string `query:"display_name"`
	DueBy       *string `query:"due_by"`
}

func (h *Handler) SearchTodos(c echo.Context) error {
	req := SearchTodosRequest{}
	if err := c.Bind(&req); err != nil {
		return c.JSON(400, "Invalid request.")
	}

	search := &model.TodoSearchParams{
		ID:          req.ID,
		DisplayName: req.DisplayName,
	}

	if req.DueBy != nil {
		parsedDueBy, err := h.parseDate(*req.DueBy)
		if err != nil {
			return c.JSON(400, "Invalid date format. Please use ISO 8601 format.")
		}
		search.DueBy = &parsedDueBy
	}

	todos, err := h.TodoRepository.Search(search)
	h.logger.Infof("Searching todos: %v", todos)
	if err != nil {
		h.logger.Errorf("Error searching todos: %v", err)
		return c.JSON(500, "Internal server error.")
	}

	return c.JSON(200, todos)
}

type CreateTodoRequest struct {
	DisplayName string  `json:"display_name"`
	DueBy       *string `json:"due_by"`
}

func (h *Handler) CreateTodo(c echo.Context) error {

	req := CreateTodoRequest{}
	if err := c.Bind(&req); err != nil {
		return c.JSON(400, "Invalid request.")
	}

	todo := &model.Todo{
		DisplayName: req.DisplayName,
	}

	if req.DueBy != nil {
		parsedDueBy, err := h.parseDate(*req.DueBy)
		if err != nil {
			return c.JSON(400, "Invalid date format. Please use ISO 8601 format.")
		}
		todo.DueBy = parsedDueBy
	}

	err := h.TodoRepository.Create(todo)
	if err != nil {
		h.logger.Errorf("Error creating todo: %v", err)
		return c.JSON(500, "Internal server error.")
	}

	return c.JSON(201, todo)
}

type UpdateTodoRequest struct {
	ID          uint    `param:"id"`
	DisplayName *string `json:"display_name"`
	DueBy       *string `json:"due_by"`
}

func (h *Handler) UpdateTodo(c echo.Context) error {

	req := UpdateTodoRequest{}
	if err := c.Bind(&req); err != nil {
		return c.JSON(400, "Invalid request.")
	}

	update := &model.UpdateTodo{
		DisplayName: req.DisplayName,
	}

	if req.DueBy != nil {
		parsedDueBy, err := h.parseDate(*req.DueBy)
		if err != nil {
			return c.JSON(400, "Invalid date format. Please use ISO 8601 format.")
		}
		update.DueBy = &parsedDueBy
	}

	existingTodo, err := h.TodoRepository.GetByID(req.ID)
	if err == gorm.ErrRecordNotFound {
		return c.JSON(404, "Todo not found.")
	}
	if err != nil {
		return c.JSON(500, "Internal server error.")
	}

	err = h.TodoRepository.Update(existingTodo, update)
	if err != nil {
		h.logger.Errorf("Error updating todo: %v", err)
		return c.JSON(500, "Internal server error.")
	}

	return c.JSON(200, existingTodo)
}

type DeleteTodoRequest struct {
	ID uint `param:"id"`
}

func (h *Handler) DeleteTodo(c echo.Context) error {

	req := DeleteTodoRequest{}
	if err := c.Bind(&req); err != nil {
		return c.JSON(400, "Invalid request.")
	}

	todo, err := h.TodoRepository.GetByID(req.ID)
	if err == gorm.ErrRecordNotFound {
		return c.JSON(404, "Todo not found.")
	}
	if err != nil {
		h.logger.Errorf("Error getting todo: %v", err)
		return c.JSON(500, "Internal server error.")
	}

	err = h.TodoRepository.Delete(todo)
	if err != nil {
		h.logger.Errorf("Error deleting todo: %v", err)
		return c.JSON(500, "Internal server error.")
	}

	return c.JSON(200, "Todo deleted.")
}

func (h *Handler) parseDate(date string) (time.Time, error) {
	parsedDate, err := time.Parse(time.RFC3339, date)
	if err != nil {
		return time.Time{}, err
	}

	return parsedDate, nil
}
