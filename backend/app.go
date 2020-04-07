package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/lib/pq"
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
	reportProblem := func(ev pq.ListenerEventType, err error) {
		if err != nil {
			fmt.Println(err.Error())
		}
	}

	listener := pq.NewListener(connectionString, 10*time.Second, time.Minute, reportProblem)
	err = listener.Listen("events")
	if err != nil {
		panic(err)
	}

	fmt.Println("Start monitoring PostgreSQL...")
	for {
		waitForNotification(listener)
	}
}

func (a *App) Run(addr string) {
	allowedHeaders := []string{"X-Requested-With", "Content-Type"}
	allowedMethods := []string{"GET"}
	allowOrigins := []string{"*"}
	handlerHeaders := handlers.AllowedHeaders(allowedHeaders)
	handlerMethods := handlers.AllowedMethods(allowedMethods)
	handlerOrigins := handlers.AllowedOrigins(allowOrigins)
	log.Fatal(http.ListenAndServe(":8010", handlers.CORS(handlerHeaders, handlerMethods, handlerOrigins)(a.Router)))
}

func (a *App) getTask(w http.ResponseWriter, r *http.Request) {
	vars := r.URL.Query()
	id, err := strconv.Atoi(vars.Get("task_id"))
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid task ID")
		return
	}
	t := task{}
	if err := t.getTaskByID(a.DB, id); err != nil {
		switch err {
		case sql.ErrNoRows:
			respondWithError(w, http.StatusNotFound, "Task not found")
		default:
			respondWithError(w, http.StatusInternalServerError, err.Error())
		}
	}
	respondWithJSON(w, http.StatusOK, t)

}
func (a *App) getLastRunTask(w http.ResponseWriter, r *http.Request) {
	t := task{}
	if err := t.getLastRunTask(a.DB); err != nil {
		respondWithError(w, http.StatusInternalServerError, err.Error())
	}
	respondWithJSON(w, http.StatusOK, t)
}
func (a *App) getAllTasks(w http.ResponseWriter, r *http.Request) {
	vars := r.URL.Query()
	t := task{}
	if numOfTasks, err := strconv.Atoi(vars.Get("num")); err == nil {
		tasks, err := t.getNTasks(a.DB, numOfTasks)
		if err != nil {
			respondWithError(w, http.StatusInternalServerError, err.Error())
		}
		respondWithJSON(w, http.StatusOK, tasks)
	} else {
		tasks, err := t.getAllTasks(a.DB)
		if err != nil {
			respondWithError(w, http.StatusInternalServerError, err.Error())
		}
		respondWithJSON(w, http.StatusOK, tasks)
	}
}
func (a *App) getFile(w http.ResponseWriter, r *http.Request) {
	vars := r.URL.Query()
	ID, err := strconv.Atoi(vars.Get("file_id"))
	if err != nil {
		respondWithError(w, http.StatusBadRequest, err.Error())
		return
	}
	f := file{}
	if err := f.getFileByID(a.DB, ID); err != nil {
		switch err {
		case sql.ErrNoRows:
			respondWithError(w, http.StatusNotFound, "File not found")
		default:
			respondWithError(w, http.StatusInternalServerError, err.Error())
		}
	}
	respondWithJSON(w, http.StatusOK, f)
}
func (a *App) getAllFiles(w http.ResponseWriter, r *http.Request) {
	f := file{}
	files, err := f.getAllFiles(a.DB)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, err.Error())
	}
	respondWithJSON(w, http.StatusOK, files)
}
func (a *App) getFilesByTask(w http.ResponseWriter, r *http.Request) {
	vars := r.URL.Query()
	TaskID, err := strconv.Atoi(vars.Get("task_id"))
	limit, err := strconv.Atoi(vars.Get("limit"))
	offset, err := strconv.Atoi(vars.Get("offset"))
	if err != nil {
		respondWithError(w, http.StatusBadRequest, err.Error())
		return
	}
	// tf := taskFile{}
	f := file{}
	taskFilesForID, err := f.getFilesByTaskID(a.DB, TaskID, limit, offset)
	if err != nil {
		switch err {
		case sql.ErrNoRows:
			respondWithError(w, http.StatusNotFound, "Task ID not found")
		default:
			respondWithError(w, http.StatusInternalServerError, err.Error())
		}
	}
	respondWithJSON(w, http.StatusOK, taskFilesForID)
}
func (a *App) getRoot(w http.ResponseWriter, r *http.Request) {
	var message string = "Hit an endpoint such as /tasks or /task/{id} to retrieve data"
	w.WriteHeader(http.StatusOK)
	response, _ := json.Marshal(message)
	w.Write(response)
}
func (a *App) initializeRoutes() {
	a.Router.HandleFunc("/tasks", a.getAllTasks).Methods("GET")
	a.Router.HandleFunc("/task", a.getTask).Methods("GET")
	a.Router.HandleFunc("/lastRunTask", a.getLastRunTask).Methods("GET")
	a.Router.HandleFunc("/files", a.getAllFiles).Methods("GET")
	a.Router.HandleFunc("/file", a.getFile).Methods("GET")
	a.Router.HandleFunc("/filesByTask", a.getFilesByTask).Methods("GET")
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
