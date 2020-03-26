export interface TaskFilesModel {
    taskCompleted: boolean;
    fileId: number;
    fileName: string;
    filePercentage: string;
    fileEta: string;
    fileSize: string;
    fileTransferSpeed: string;
    taskEta: string;
    taskElapsedTime: string;
    taskStartedAt: string;
    taskEndedAt: string;
    taskNumberOfChecksDone: string;
    taskTotalNumberOfChecks: string;
    taskNumberOfFilesUploaded: string;
    taskTotalNumberOfFiles: string;
    taskUploadedSize: string;
    taskTotalSize: string;
    taskTransferSpeed: string;
    taskPercentage: string;
}