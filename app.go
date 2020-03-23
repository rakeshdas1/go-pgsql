package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
)

type App struct {
	Router *mux.Router
	DB     *sql.DB
}

func (a *App) Initialize(user, password, dbname string) {
	connectionString := fmt.Sprintf("host=192.168.1.150 port=5432 user=%s password=%s dbname=%s sslmode=disable", user, password, dbname)
	var err error
	a.DB, err = sql.Open("postgres", connectionString)
	if err != nil {
		log.Fatal(err)
	}

	a.Router = mux.NewRouter()
	a.initializeRoutes()
	log.Println("Running server on http://localhost:8010")
}

func (a *App) Run(addr string) {
	log.Fatal(http.ListenAndServe(":8010", a.Router))
}

func (a *App) getTask(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid task ID")
		return
	}
	t := task{}
	if err := t.getTask(a.DB, id); err != nil {
		switch err {
		case sql.ErrNoRows:
			respondWithError(w, http.StatusNotFound, "Task not found")
		default:
			respondWithError(w, http.StatusInternalServerError, err.Error())
		}
	}
	respondWithJSON(w, http.StatusOK, t)
}
func (a *App) getAllTasks(w http.ResponseWriter, r *http.Request) {
	t := task{}
	tasks, err := t.getAllTasks(a.DB)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, err.Error())
	}
	respondWithJSON(w, http.StatusOK, tasks)
}
func (a *App) getRoot(w http.ResponseWriter, r *http.Request) {
	var message string = "Hit an endpoint such as /tasks or /task/{id} to retrieve data"
	w.WriteHeader(http.StatusOK)
	response, _ := json.Marshal(message)
	w.Write(response)
}
func (a *App) initializeRoutes() {
	a.Router.HandleFunc("/tasks", a.getAllTasks).Methods("GET")
	a.Router.HandleFunc("/task/{id:[0-9]+}", a.getTask).Methods("GET")
	a.Router.HandleFunc("/", a.getRoot).Methods("GET")
}
func respondWithError(w http.ResponseWriter, code int, message string) {
	respondWithJSON(w, code, map[string]string{"error": message})
}
func respondWithJSON(w http.ResponseWriter, code int, payload interface{}) {
	response, _ := json.Marshal(payload)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	w.Write(response)
}
