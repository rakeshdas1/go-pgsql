package main

import (
	"database/sql"
)

type task struct {
	completed             bool   `json:"completed"`
	ID                    int    `json:"task_id"`
	source                string `json:"source"`
	destination           string `json:"destination"`
	elapsedTime           string `json:"elapsed_time"`
	startedAt             string `json:"started_at"`
	endedAt               string `json:"ended_at"`
	eta                   string `json:"eta"`
	numberOfChecksDone    string `json:"number_of_checks_done"`
	totalNumberOfChecks   string `json:"total_number_of_checks"`
	numberOfFilesUploaded string `json:"number_of_files_uploaded"`
	totalNumberOfFiles    string `json:"total_number_of_files"`
	uploadedSize          string `json:"uploaded_size"`
	totalSize             string `json:"total_size"`
	transferSpeed         string `json:"transfer_speed"`
	percentage            string `json:"percentage"`
}

func (t *task) getTask(db *sql.DB) error {
	return db.QueryRow("SELECT * FROM backups.tasks WHERE task_id=$1", 36).Scan(&t.completed, &t.ID, &t.source, &t.destination, &t.elapsedTime, &t.startedAt, &t.endedAt, &t.eta, &t.numberOfChecksDone, &t.totalNumberOfChecks, &t.numberOfFilesUploaded, &t.totalNumberOfFiles, &t.uploadedSize, &t.totalSize, &t.transferSpeed, &t.percentage)
}
func (t *task) getAllTasks(db *sql.DB) ([]task, error) {
	rows, err := db.Query("SELECT * FROM backups.tasks")
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	tasks := []task{}
	for rows.Next() {
		var t task
		if err := rows.Scan(&t.completed, &t.ID, &t.source, &t.destination, &t.elapsedTime, &t.startedAt, &t.endedAt, &t.eta, &t.numberOfChecksDone, &t.totalNumberOfChecks,
			&t.numberOfFilesUploaded, &t.totalNumberOfFiles, &t.uploadedSize, &t.totalSize, &t.transferSpeed, &t.transferSpeed); err != nil {
			return nil, err
		}
		tasks = append(tasks, t)
	}
	return tasks, nil
}
