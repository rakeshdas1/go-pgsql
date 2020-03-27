import { useState,useEffect } from "react";
import './TaskPage.css'
import { TaskModel } from "../../models/Task.model";
import React from "react";
import { getLastRunTask } from "../../api/rcloneApi";
import TaskComponent from "../Task/Task";

export const TaskPageComponent = () => {
    const [latestTask, setLatestTask] = useState<TaskModel>()
    useEffect(() => {
        getLastRunTask()
            .then(data => {
                setLatestTask(data);
            });
    }, []);
    return (
        <div className="task-page">
            <TaskComponent task={latestTask}></TaskComponent>
        </div>
    )
}
export default TaskPageComponent;