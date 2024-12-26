package handler

import (
	"github.com/labstack/echo/v4"
)

func (h *Handler) RegisterRoutes(router *echo.Group) {

	//Todo routes
	router.GET("/todo", h.SearchTodos)
	router.GET("/todo/:id", h.GetTodo)
	router.PUT("/todo/:id", h.UpdateTodo)
	router.POST("/todo", h.CreateTodo)
	router.DELETE("/todo/:id", h.DeleteTodo)
}
