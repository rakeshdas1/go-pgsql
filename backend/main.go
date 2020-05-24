package main

import (
	"log"
	"os"
	"github.com/joho/godotenv"
)

func main() {
	a := App{}
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file! %s", err)
	}
	// a.Initialize("rclonemanager", "sql", "rclone")
	a.Initialize(os.Getenv("DB_HOST"), os.Getenv("DB_PORT"), os.Getenv("DB_USER"), os.Getenv("DB_PASSWORD"), os.Getenv("DB_NAME"))
	a.Run(":8080")
}
