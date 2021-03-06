import { TaskModel } from "../models/Task.model"
import { FileModel } from "../models/File.model";

const apiUrl = process.env.REACT_APP_API_ENDPOINT

export const getLastRunTask = async (): Promise<TaskModel> => {
    const res = await fetch(`${apiUrl}/lastRunTask`);
    return await res.json()
}
export const getNTasks = async (numOfTasks: number): Promise<TaskModel[]> => {
    const res = await fetch(`${apiUrl}/tasks?num=${numOfTasks}`);
    return await res.json();
}
export const getTask = async (taskId: number): Promise<TaskModel> => {
    const res = await fetch(`${apiUrl}/task?task_id=${taskId}`);
    return await res.json();
}
export const getAllTasks = async (): Promise<TaskModel[]> => {
    const res = await fetch(`${apiUrl}/tasks`);
    return await res.json();
}
export const getFile = async (fileId: number): Promise<FileModel> => {
    const res = await fetch(`${apiUrl}/files?file_id=${fileId}`);
    return await res.json();
}
export const getFilesForTask = async (limit: number, offset: number, taskId?: number): Promise<FileModel[]> => {
    const res = await fetch(`${apiUrl}/filesByTask?task_id=${taskId}&limit=${limit}&offset=${offset}`);
    return await res.json();
}
