package main

import (
	"database/sql"
)

type task struct {
	Completed             bool   `json:"completed"`
	TaskID                int    `json:"task_id"`
	Source                string `json:"source"`
	Destination           string `json:"destination"`
	ElapsedTime           string `json:"elapsed_time"`
	StartedAt             string `json:"started_at"`
	EndedAt               string `json:"ended_at"`
	Eta                   string `json:"eta"`
	NumberOfChecksDone    string `json:"number_of_checks_done"`
	TotalNumberOfChecks   string `json:"total_number_of_checks"`
	NumberOfFilesUploaded string `json:"number_of_files_uploaded"`
	TotalNumberOfFiles    string `json:"total_number_of_files"`
	UploadedSize          string `json:"uploaded_size"`
	TotalSize             string `json:"total_size"`
	TransferSpeed         string `json:"transfer_speed"`
	Percentage            string `json:"percentage"`
}

func (t *task) getTaskByID(db *sql.DB, taskID int) error {
	return db.QueryRow("SELECT * FROM backups.tasks WHERE task_id=$1", taskID).Scan(&t.Completed, &t.TaskID, &t.Source, &t.Destination, &t.ElapsedTime, &t.StartedAt, &t.EndedAt, &t.Eta, &t.NumberOfChecksDone, &t.TotalNumberOfChecks, &t.NumberOfFilesUploaded, &t.TotalNumberOfFiles, &t.UploadedSize, &t.TotalSize, &t.TransferSpeed, &t.Percentage)
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
		if err := rows.Scan(&t.Completed, &t.TaskID, &t.Source, &t.Destination, &t.ElapsedTime, &t.StartedAt, &t.EndedAt, &t.Eta, &t.NumberOfChecksDone, &t.TotalNumberOfChecks, &t.NumberOfFilesUploaded, &t.TotalNumberOfFiles, &t.UploadedSize, &t.TotalSize, &t.TransferSpeed, &t.Percentage); err != nil {
			return nil, err
		}
		tasks = append(tasks, t)
	}
	return tasks, nil
}
