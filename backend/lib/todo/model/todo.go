package model

import "time"

type TodoSearchParams struct {
	ID          *uint      `json:"id"`
	DisplayName *string    `json:"display_name"`
	DueBy       *time.Time `json:"due_by"`
}

type Todo struct {
	ID          uint      `json:"id"`
	DisplayName string    `json:"display_name"`
	DueBy       time.Time `json:"due_by"`
}

type UpdateTodo struct {
	DisplayName *string    `json:"display_name"`
	DueBy       *time.Time `json:"due_by"`
}
