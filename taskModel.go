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
func (t *task) getLastRunTask(db *sql.DB) error {
	return db.QueryRow("SELECT * FROM backups.tasks ORDER BY task_id DESC LIMIT 1").Scan(&t.Completed, &t.TaskID, &t.Source, &t.Destination, &t.ElapsedTime, &t.StartedAt, &t.EndedAt, &t.Eta, &t.NumberOfChecksDone, &t.TotalNumberOfChecks, &t.NumberOfFilesUploaded, &t.TotalNumberOfFiles, &t.UploadedSize, &t.TotalSize, &t.TransferSpeed, &t.Percentage)
}
func (t *task) getAllTasks(db *sql.DB) ([]task, error) {
	rows, err := db.Query("SELECT * FROM backups.tasks ORDER BY task_id DESC")
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	tasks := []task{}
	for rows.Next() {
		var currentTask task
		if err := rows.Scan(&currentTask.Completed, &currentTask.TaskID, &currentTask.Source, &currentTask.Destination, &currentTask.ElapsedTime, &currentTask.StartedAt, &currentTask.EndedAt, &currentTask.Eta, &currentTask.NumberOfChecksDone, &currentTask.TotalNumberOfChecks, &currentTask.NumberOfFilesUploaded, &currentTask.TotalNumberOfFiles, &currentTask.UploadedSize, &currentTask.TotalSize, &currentTask.TransferSpeed, &currentTask.Percentage); err != nil {
			return nil, err
		}
		tasks = append(tasks, currentTask)
	}
	return tasks, nil
}
func (t *task) getNTasks(db *sql.DB, num int) ([]task, error) {
	rows, err := db.Query("SELECT * FROM backups.tasks ORDER BY task_id DESC LIMIT $1", num)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	tasks := []task{}
	for rows.Next() {
		var currentTask task
		if err := rows.Scan(&currentTask.Completed, &currentTask.TaskID, &currentTask.Source, &currentTask.Destination, &currentTask.ElapsedTime, &currentTask.StartedAt, &currentTask.EndedAt, &currentTask.Eta, &currentTask.NumberOfChecksDone, &currentTask.TotalNumberOfChecks, &currentTask.NumberOfFilesUploaded, &currentTask.TotalNumberOfFiles, &currentTask.UploadedSize, &currentTask.TotalSize, &currentTask.TransferSpeed, &currentTask.Percentage); err != nil {
			return nil, err
		}
		tasks = append(tasks, currentTask)
	}
	return tasks, nil
}
