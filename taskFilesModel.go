package main

import (
	"database/sql"
)

type taskFile struct {
	TaskCompleted             bool   `json:"taskCompleted"`
	FileID                    int    `json:"fileId"`
	FileName                  string `json:"fileName"`
	FilePercentage            string `json:"filePercentage"`
	FileEta                   string `json:"fileEta"`
	FileSize                  string `json:"fileSize"`
	FileTransferSpeed         string `json:"fileTransferSpeed"`
	TaskEta                   string `json:"taskEta"`
	TaskElapsedTime           string `json:"taskElapsedTime"`
	TaskStartedAt             string `json:"taskStartedAt"`
	TaskEndedAt               string `json:"taskEndedAt"`
	TaskNumberOfChecksDone    string `json:"taskNumberOfChecksDone"`
	TaskTotalNumberOfChecks   string `json:"taskTotalNumberOfChecks"`
	TaskNumberOfFilesUploaded string `json:"taskNumberOfFilesUploaded"`
	TaskTotalNumberOfFiles    string `json:"taskTotalNumberOfFiles"`
	TaskUploadedSize          string `json:"taskUploadedSize"`
	TaskTotalSize             string `json:"taskTotalSize"`
	TaskTransferSpeed         string `json:"taskTransferSpeed"`
	TaskPercentage            string `json:"taskPercentage"`
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
