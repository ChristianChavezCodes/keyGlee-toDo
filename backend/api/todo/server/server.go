package server

import (
    "github.com/keyglee/assessment/api/router"
    "github.com/keyglee/assessment/api/todo/handler"
    "github.com/labstack/echo/v4"
    "github.com/labstack/echo/v4/middleware"
)

func CreateServer(props *router.RouterProps) *echo.Echo {
    r := router.New()

    // Enable CORS for localhost:3000 
    r.Use(middleware.CORSWithConfig(middleware.CORSConfig{
        AllowOrigins: []string{"http://localhost:3000"},
        AllowMethods: []string{
            echo.GET,
            echo.HEAD,
            echo.PUT,
            echo.PATCH,
            echo.POST,
            echo.DELETE,
        },
        AllowHeaders: []string{
            echo.HeaderOrigin,
            echo.HeaderContentType,
            echo.HeaderAccept,
            echo.HeaderAuthorization,
        },
    }))

    h := handler.NewHandler()
    h.RegisterRoutes(r.Group(props.BasePath))

    return r
}
