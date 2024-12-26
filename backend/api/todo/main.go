package main

import (
	"os"

	"github.com/keyglee/assessment/api/router"
	"github.com/keyglee/assessment/api/todo/server"
)

func main() {
	s := server.CreateServer(&router.RouterProps{})

	port := os.Getenv("PORT")
	if port == "" {
		port = "4000"
	}

	if err := s.Start(":" + port); err != nil {
		panic(err)
	}
}
