export interface TaskModel {
    completed: boolean;
    taskId: number;
    source: string;
    destination: string;
    elapsedTime: string;
    startedAt: string;
    endedAt: string;
    eta: string;
    numberOfChecksDone: string;
    totalNumberOfChecks: string;
    numberOfFilesUploaded: string;
    totalNumberOfFiles: string;
    uploadedSize: string;
    totalSize: string;
    transferSpeed: string;
    percentage: string
}