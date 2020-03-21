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
	t := task{ID: id}
	if err := t.getTask(a.DB); err != nil {
		switch err {
		case sql.ErrNoRows:
			respondWithError(w, http.StatusNotFound, "Task not found")
		default:
			respondWithError(w, http.StatusInternalServerError, err.Error())
		}
	}
	respondWithJson(w, http.StatusOK, t)
}
func (a *App) getAllTasks(w http.ResponseWriter, r *http.Request) {
	t := task{}
	tasks, err := t.getAllTasks(a.DB)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, err.Error())
	}
	fmt.Println("Getting all tasks...")
	fmt.Printf("%+v\n", tasks)
	respondWithJson(w, http.StatusOK, tasks)
}
func (a *App) initializeRoutes() {
	a.Router.HandleFunc("/tasks", a.getAllTasks).Methods("GET")
	a.Router.HandleFunc("/task/{id:[0-9]+}", a.getTask).Methods("GET")
}
func respondWithError(w http.ResponseWriter, code int, message string) {
	respondWithJson(w, code, map[string]string{"error": message})
}
func respondWithJson(w http.ResponseWriter, code int, payload interface{}) {
	response, _ := json.Marshal(payload)
	fmt.Printf("%+v\n", payload)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	w.Write(response)
}
