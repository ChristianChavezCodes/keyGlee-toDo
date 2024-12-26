package server

import (
	"github.com/keyglee/assessment/api/router"
	"github.com/keyglee/assessment/api/todo/handler"
	"github.com/labstack/echo/v4"
)

func CreateServer(props *router.RouterProps) *echo.Echo {
	r := router.New()

	h := handler.NewHandler()

	h.RegisterRoutes(r.Group(props.BasePath))

	return r
}
