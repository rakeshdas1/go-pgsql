package main

import (
	"database/sql"
)

type taskFile struct {
	TaskCompleted             bool   `json:"task_completed"`
	FileID                    int    `json:"file_id"`
	FileName                  string `json:"file_name"`
	FilePercentage            string `json:"file_percentage"`
	FileEta                   string `json:"file_eta"`
	FileSize                  string `json:"file_size"`
	FileTransferSpeed         string `json:"file_transfer_speed"`
	TaskEta                   string `json:"task_eta"`
	TaskElapsedTime           string `json:"task_elapsed_time"`
	TaskStartedAt             string `json:"task_started_at"`
	TaskEndedAt               string `json:"task_ended_at"`
	TaskNumberOfChecksDone    string `json:"task_number_of_checks_done"`
	TaskTotalNumberOfChecks   string `json:"task_total_number_of_checks"`
	TaskNumberOfFilesUploaded string `json:"task_number_of_files_uploaded"`
	TaskTotalNumberOfFiles    string `json:"task_total_number_of_files"`
	TaskUploadedSize          string `json:"task_uploaded_size"`
	TaskTotalSize             string `json:"task_total_size"`
	TaskTransferSpeed         string `json:"task_transfer_speed"`
	TaskPercentage            string `json:"task_percentage"`
}

func (tf *taskFile) getTaskFilesByID(db *sql.DB, taskID int) ([]taskFile, error) {
	rows, err := db.Query("SELECT * FROM backups.get_files_by_task_id($1)", taskID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	taskFiles := []taskFile{}
	for rows.Next() {
		var currentTaskFile taskFile
		if err := rows.Scan(&currentTaskFile.TaskCompleted, &currentTaskFile.FileID, &currentTaskFile.FileName, &currentTaskFile.FilePercentage, &currentTaskFile.FileEta, &currentTaskFile.FileSize, &currentTaskFile.FileTransferSpeed, &currentTaskFile.TaskEta, &currentTaskFile.TaskElapsedTime, &currentTaskFile.TaskStartedAt, &currentTaskFile.TaskEndedAt, &currentTaskFile.TaskNumberOfChecksDone, &currentTaskFile.TaskTotalNumberOfChecks, &currentTaskFile.TaskNumberOfFilesUploaded, &currentTaskFile.TaskTotalNumberOfFiles, &currentTaskFile.TaskUploadedSize, &currentTaskFile.TaskTotalSize, &currentTaskFile.TaskTransferSpeed, &currentTaskFile.TaskPercentage); err != nil {
			return nil, err
		}
		taskFiles = append(taskFiles, currentTaskFile)
	}
	return taskFiles, nil
}
