package main

import (
	"database/sql"
)

type file struct {
	FileID        int    `json:"fileId"`
	FileName      string `json:"fileName"`
	UploadedSize  string `json:"uploadedSize"`
	Percentage    string `json:"percentage"`
	Eta           string `json:"eta"`
	FileSize      string `json:"fileSize"`
	TransferSpeed string `json:"transferSpeed"`
	TaskID        int    `json:"taskId"`
}

func (f *file) getFileById(db *sql.DB, fileID int) error {
	return db.QueryRow("SELECT * FROM backups.files WHERE file_id=$1", fileID).Scan(&f.FileID, &f.FileName, &f.UploadedSize, &f.Percentage, &f.Eta, &f.FileSize, &f.TransferSpeed, &f.TaskID)
}

func (f *file) getAllFiles(db *sql.DB) ([]file, error) {
	rows, err := db.Query("SELECT * FROM backups.files")
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	files := []file{}
	for rows.Next() {
		var currentFile file
		if err := rows.Scan(&currentFile.FileID, &currentFile.FileName, &currentFile.UploadedSize, &currentFile.Percentage, &currentFile.Eta, &currentFile.FileSize, &currentFile.TransferSpeed, &currentFile.TaskID); err != nil {
			return nil, err
		}
		files = append(files, currentFile)
	}
	return files, nil
}
