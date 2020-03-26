import { TaskModel } from "../models/Task.model"

const apiUrl = process.env.REACT_APP_API_ENDPOINT

export const getLastRunTask = async (): Promise<TaskModel> => {
    const res = await fetch(`${apiUrl}/lastRunTask`)
    return await res.json()
}

