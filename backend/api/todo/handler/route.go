package handler

import (
	"github.com/labstack/echo/v4"
)

func (h *Handler) RegisterRoutes(router *echo.Group) {

	//Todo routes
	router.GET("/todos", h.SearchTodos)
	router.GET("/todos/:id", h.GetTodo)
	router.PUT("/todos/:id", h.UpdateTodo)
	router.POST("/todos", h.CreateTodo)
	router.DELETE("/todos/:id", h.DeleteTodo)
}
